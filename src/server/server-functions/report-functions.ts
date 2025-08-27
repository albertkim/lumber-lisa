import { CompanyService } from "@/server/services/CompanyService"
import { IntegrationService } from "@/server/services/IntegrationService"
import { createServerFn } from "@tanstack/react-start"
import { createError } from "@tanstack/react-start/server"
import z from "zod"
import { authMiddleware } from "./middleware/auth-middleware"
import { userBelongsToCompanyMiddleware } from "./middleware/user-belongs-to-company-middleware"

export const getInvoiceQuantityReport = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .validator(z.object({ companyId: z.number() }))
  .handler(async ({ data, context }) => {
    const { user } = context
    const companyId = data.companyId

    // Verify user has access to this company
    if (!user.isAdmin && user.company.companyId !== companyId) {
      throw createError({
        status: 403,
        message: "Unauthorized, user does not belong to company"
      })
    }

    const company = await CompanyService.getCompanyById(companyId)
    const report = await IntegrationService.runLisaQuery(company)
    return report
  })
