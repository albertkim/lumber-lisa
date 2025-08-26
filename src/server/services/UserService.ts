import { CreateUser, Login, LoginResponse, UpdateUser, User } from "@/models"
import { generateResetPasswordEmail } from "@/server/emails/ResetPasswordEmail"
import { generateWelcomeEmail } from "@/server/emails/WelcomeEmail"
import { UserRepository } from "@/server/repositories/UserRepository"
import { EmailUtilities } from "@/server/utilities/EmailUtilities"
import { SecurityRoleService } from "./SecurityRoleService"

export const UserService = {
  async login(login: Login): Promise<LoginResponse> {
    const user = await UserRepository.login(login.email, login.password)
    return user
  },

  async getUserById(id: number): Promise<User | null> {
    const user = await UserRepository.getUser(id)
    return user
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserRepository.getUserByEmail(email)
    return user
  },

  async getAuthUser(token: string): Promise<User | null> {
    const user = await UserRepository.getUserByToken(token)
    return user
  },

  async getUsers(): Promise<User[]> {
    const users = await UserRepository.getUsers()
    return users
  },

  async createCompanyUser(companyId: number, createUser: CreateUser): Promise<User> {
    const randomPassword = Math.random().toString(36).slice(-8)
    // TODO: Get security role from user input
    const securityRole = await SecurityRoleService.getSecurityRoleByRoleName(companyId, "Admin")
    const user = await UserRepository.createUser(
      createUser.userEmail,
      randomPassword,
      createUser.userFullName,
      companyId,
      securityRole.securityRoleId
    )
    const resetPasswordToken = await UserRepository.createResetPasswordToken(user.userId)
    await EmailUtilities.sendEmail(
      user.userEmail,
      "Welcome to Lumber",
      await generateWelcomeEmail(user, resetPasswordToken)
    )
    return user
  },

  async updateUser(userId: number, updateUser: UpdateUser): Promise<User> {
    const user = await UserRepository.updateUser(userId, updateUser)
    return user
  },

  async createResetPasswordTokenAndSendEmail(user: User): Promise<string> {
    const token = await UserRepository.createResetPasswordToken(user.userId)
    await EmailUtilities.sendEmail(user.userEmail, "Reset Password", await generateResetPasswordEmail(token))
    console.log(`Reset password url: ${process.env.WEB_URL}/reset-password/${token}`)
    return token
  },

  async validateResetPasswordToken(token: string): Promise<boolean> {
    const isValid = await UserRepository.validateResetPasswordToken(token)
    return isValid
  },

  async resetPassword(token: string, password: string): Promise<User> {
    const user = await UserRepository.resetPassword(token, password)
    return user
  }
}
