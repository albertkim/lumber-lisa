import { CreateUserSchema, UpdateUserSchema } from "@/models"
import { CompanyService } from "@/server/services/CompanyService"
import { UserService } from "@/server/services/UserService"
import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { authMiddleware } from "./middleware/auth-middleware"
import { userBelongsToCompanyMiddleware } from "./middleware/belongs-to-company-middleware"

export const getCompanyUsers = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .validator((d: { companyId: number }) => d)
  .handler(async ({ data, context }) => {
    const companyId = data.companyId
    const company = await CompanyService.getCompanyById(companyId)
    const users = await CompanyService.getUsersByCompanyId(companyId)
    return users
  })

export const getCompanyUserById = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .validator((d: { companyId: number; userId: number }) => d)
  .handler(async ({ data, context }) => {
    const companyId = data.companyId
    const userId = data.userId
    const user = await UserService.getUserById(userId)
    return user
  })

export const createCompanyUser = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .validator(CreateUserSchema.extend({ companyId: z.number() }))
  .handler(async ({ data, context }) => {
    const companyId = data.companyId
    const createUser = CreateUserSchema.parse(data)
    const user = await UserService.createCompanyUser(companyId, createUser)
    return user
  })

export const updateCompanyUser = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .validator(UpdateUserSchema.extend({ companyId: z.number() }))
  .handler(async ({ data, context }) => {
    const companyId = data.companyId
    const updateUser = UpdateUserSchema.parse(data)
    const user = await UserService.updateUser(updateUser.userId, updateUser)
    return user
  })
