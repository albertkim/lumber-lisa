import { AdminRegisterNewCompany } from "@/models"
import { createServerFn } from "@tanstack/react-start"
import { createError } from "@tanstack/react-start/server"
import { AdminService } from "../services/AdminService"
import { authMiddleware } from "./middleware/auth-middleware"
import { isAdminMiddleware } from "./middleware/is-admin-middleware"

export const getCompanies = createServerFn({ method: "POST" })
  .middleware([authMiddleware, isAdminMiddleware])
  .handler(async ({ context }) => {
    const { user } = context
    if (user.isAdmin) {
      const companies = await AdminService.getCompanies()
      return companies
    } else {
      throw createError({
        status: 403,
        message: "Unauthorized, user is not an admin"
      })
    }
  })

export const registerNewCompany = createServerFn({ method: "POST" })
  .middleware([authMiddleware, isAdminMiddleware])
  .validator((d: AdminRegisterNewCompany) => d)
  .handler(async ({ data }) => {
    return await AdminService.registerNewCompany(data)
  })
