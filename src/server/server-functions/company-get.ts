import { CompanyService } from "@/server/services/CompanyService"
import { createServerFn } from "@tanstack/react-start"
import { createError } from "@tanstack/react-start/server"
import { authMiddleware } from "./middleware/auth-middleware"
import { userBelongsToCompanyMiddleware } from "./middleware/user-belongs-to-company-middleware"

export const getCompany = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
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
