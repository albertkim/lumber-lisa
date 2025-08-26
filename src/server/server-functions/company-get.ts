import { CompanyService } from "@/services/CompanyService"
import { createServerFn } from "@tanstack/react-start"
import { createError } from "@tanstack/react-start/server"
import { authMiddleware } from "./middleware/auth-middleware"

export const getCompany = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { companyId: number }) => d)
  .handler(async ({ context }) => {
    const { user } = context
    const company = await CompanyService.getCompanyById(user.company.companyId)
    if (user.isAdmin || user.company.companyId === company.companyId) {
      return company
    }
    throw createError({
      status: 403,
      message: "Unauthorized, user does not belong to company"
    })
  })
