import { createError } from "@tanstack/react-start/server"
import { sql } from "kysely"
import { db } from "../database"
import { LoginResponse, UpdateUser, User, UserSchema } from "../models"
import {
  comparePasswords,
  decodeResetPasswordToken,
  encodeToken,
  encryptPassword,
  generateResetPasswordToken
} from "../utilities/UserUtilities"

async function getUser(filter: { userId?: number; userEmail?: string }): Promise<User | null> {
  let query = db
    .selectFrom("users")
    .leftJoin("user_assignments", "user_assignments.assignment_user_id", "users.user_id")
    .leftJoin("companies", "companies.company_id", "user_assignments.assignment_company_id")
    .leftJoin("security_roles", "security_roles.security_role_id", "user_assignments.assignment_security_role_id")
    .where("user_is_deleted", "is", null)
    .selectAll()

  if (filter.userId) {
    query = query.where("user_id", "=", filter.userId)
  }

  if (filter.userEmail) {
    query = query.where("user_email", "ilike", filter.userEmail)
  }

  const result = await query.executeTakeFirst()

  if (!result) {
    return null
  }

  const validatedUser = UserSchema.parse({
    userId: result.user_id,
    userFullName: result.user_full_name,
    userEmail: result.user_email,
    isAdmin: result.user_is_admin,
    securityRoleId: result.security_role_id,
    company: {
      companyId: result.company_id,
      companyName: result.company_name
    }
  })

  return validatedUser
}

export const UserRepository = {
  async getUser(id: number): Promise<User> {
    const user = await getUser({ userId: id })
    if (!user) {
      throw createError({
        status: 404,
        message: "User not found"
      })
    }
    return user
  },

  async getUserByEmail(email: string): Promise<User> {
    const user = await getUser({ userEmail: email })
    if (!user) {
      throw createError({
        status: 404,
        message: "User not found"
      })
    }
    return user
  },

  async getUserByToken(token: string): Promise<User | null> {
    const result = await db
      .selectFrom("auth_tokens")
      .selectAll()
      .where("auth_token_token", "=", token)
      .executeTakeFirst()

    if (!result) {
      return null
    }

    return await this.getUser(result.auth_token_user_id)
  },

  async getUsers(filter?: { companyId?: number }): Promise<User[]> {
    let query = db
      .selectFrom("users")
      .leftJoin("user_assignments", "user_assignments.assignment_user_id", "users.user_id")
      .leftJoin("security_roles", "security_roles.security_role_id", "user_assignments.assignment_security_role_id")
      .leftJoin("companies", "companies.company_id", "user_assignments.assignment_company_id")
      .selectAll()
      .where("user_is_deleted", "is", null)

    if (filter?.companyId) {
      query = query.where("companies.company_id", "=", filter.companyId)
    }

    const results = await query.execute()

    return results.map((user) =>
      UserSchema.parse({
        userId: user.user_id,
        userFullName: user.user_full_name,
        userEmail: user.user_email,
        isAdmin: user.user_is_admin,
        securityRoleId: user.security_role_id,
        company: {
          companyId: user.company_id,
          companyName: user.company_name
        }
      })
    )
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const userWithEmailAndPassword = await db
      .selectFrom("users")
      .selectAll()
      .where("user_email", "=", email)
      .where("user_is_deleted", "is", null)
      .executeTakeFirst()

    if (!userWithEmailAndPassword) {
      throw createError({
        status: 400,
        message: "Invalid email or password"
      })
    }

    const isPasswordValid = comparePasswords(password, userWithEmailAndPassword.user_encrypted_password!)
    if (!isPasswordValid) {
      throw createError({
        status: 400,
        message: "Invalid email or password"
      })
    }

    const user = await getUser({ userId: userWithEmailAndPassword.user_id })

    if (!user) {
      throw createError({
        status: 400,
        message: "Invalid email or password"
      })
    }

    const mockToken = encodeToken(user.userId)

    await db
      .insertInto("auth_tokens")
      .values({
        auth_token_user_id: user.userId,
        auth_token_token: mockToken
      })
      .execute()

    return {
      token: mockToken,
      user: user
    }
  },

  async createUser(
    email: string,
    password: string,
    fullName: string,
    companyId: number,
    securityRoleId: number
  ): Promise<User> {
    // Check if email already exists
    const existingUser = await getUser({ userEmail: email })

    if (existingUser) {
      throw createError({
        status: 409,
        message: "Email already exists"
      })
    }

    // Hash password
    const hashedPassword = encryptPassword(password)

    // Insert new user
    const result = await db
      .insertInto("users")
      .values({
        user_email: email,
        user_encrypted_password: hashedPassword,
        user_full_name: fullName,
        user_is_admin: false
      })
      .returningAll()
      .executeTakeFirst()

    if (!result) {
      throw createError({
        status: 500,
        message: "Failed to create user"
      })
    }

    // Insert user assignment
    const userAssignmentResult = await db
      .insertInto("user_assignments")
      .values({
        assignment_user_id: result.user_id,
        assignment_company_id: companyId,
        assignment_security_role_id: securityRoleId
      })
      .execute()

    if (!userAssignmentResult) {
      throw createError({
        status: 500,
        message: "Failed to create user assignment"
      })
    }

    return await this.getUser(result.user_id)
  },

  async updateUser(id: number, updates: UpdateUser): Promise<User> {
    const existingUser = await getUser({ userId: id })
    if (!existingUser) {
      throw createError({
        status: 404,
        message: "User not found"
      })
    }

    const updateValues = {
      user_full_name: updates.userFullName
    }

    const result = await db
      .updateTable("users")
      .set(updateValues)
      .where("user_id", "=", id)
      .returningAll()
      .executeTakeFirst()

    if (!result) {
      throw createError({
        status: 404,
        message: "User not found"
      })
    }

    const updatedUser = await getUser({ userId: id })
    if (!updatedUser) {
      throw createError({
        status: 404,
        message: "User not found"
      })
    }

    return updatedUser
  },

  async deleteUser(id: number): Promise<void> {
    const existingUser = await getUser({ userId: id })
    if (!existingUser) {
      throw createError({
        status: 404,
        message: "User not found"
      })
    }

    const result = await db
      .updateTable("users")
      .set({
        user_is_deleted: sql`NOW()`
      })
      .where("user_id", "=", id)
      .where("user_is_deleted", "is", null)
      .execute()

    if (!result) {
      throw createError({
        status: 404,
        message: "User not found"
      })
    }
  },

  async createResetPasswordToken(userId: number): Promise<string> {
    const token = generateResetPasswordToken(userId)
    await db
      .insertInto("reset_password_tokens")
      .values({
        reset_password_token_user_id: userId,
        reset_password_token_token: token
      })
      .execute()

    return token
  },

  async validateResetPasswordToken(token: string): Promise<boolean> {
    const result = await db
      .selectFrom("reset_password_tokens")
      .selectAll()
      .where("reset_password_token_token", "=", token)
      .executeTakeFirst()
    return !!result
  },

  async resetPassword(token: string, password: string): Promise<User> {
    const { userId: decodedUserId } = decodeResetPasswordToken(token)
    const user = await getUser({ userId: decodedUserId })
    if (!user) {
      throw createError({
        status: 404,
        message: "User not found"
      })
    }
    await db
      .updateTable("users")
      .set({ user_encrypted_password: encryptPassword(password) })
      .where("user_id", "=", user.userId)
      .execute()
    await db.deleteFrom("reset_password_tokens").where("reset_password_token_user_id", "=", user.userId).execute()
    return user
  },

  async getUserAssignments(userId: number) {
    return await db
      .selectFrom("user_assignments")
      .innerJoin("companies", "companies.company_id", "user_assignments.assignment_company_id")
      .leftJoin("locations", "locations.location_id", "user_assignments.assignment_location_id")
      .innerJoin("security_roles", "security_roles.security_role_id", "user_assignments.assignment_security_role_id")
      .select([
        "companies.company_id",
        "companies.company_name",
        "locations.location_id",
        "locations.location_name",
        "security_roles.security_role_id",
        "security_roles.security_role_name"
      ])
      .where("user_assignments.assignment_user_id", "=", userId)
      .execute()
  }
}
