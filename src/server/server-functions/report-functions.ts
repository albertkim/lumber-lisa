import { CompanyService } from "@/server/services/CompanyService"
import { IntegrationService } from "@/server/services/IntegrationService"
import { createServerFn } from "@tanstack/react-start"
import z from "zod"
import { authMiddleware } from "./middleware/auth-middleware"
import { userBelongsToCompanyMiddleware } from "./middleware/belongs-to-company-middleware"

export const getInvoiceQuantityReport = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .inputValidator(z.object({ companyId: z.number() }))
  .handler(async ({ data, context }) => {
    const companyId = data.companyId
    const company = await CompanyService.getCompanyById(companyId)
    const report = await IntegrationService.runLisaInventoryQuantityQuery(company)
    return report
  })

export const getCurrentInventoryReport = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .inputValidator(z.object({ companyId: z.number() }))
  .handler(async ({ data, context }) => {
    const companyId = data.companyId

    const company = await CompanyService.getCompanyById(companyId)
    const report = await IntegrationService.runLisaCurrentInventoryQuery(company)
    return report
  })

export const getProductionRunReport = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .inputValidator(
    z.object({
      companyId: z.number(),
      limit: z.number().int().min(1).max(200).optional(),
      dateFrom: z.string().optional(),
      dateTo: z.string().optional()
    })
  )
  .handler(async ({ data, context }) => {
    const companyId = data.companyId
    const company = await CompanyService.getCompanyById(companyId)
    const report = await IntegrationService.runLisaProductionRunQuery(company, {
      limit: data.limit,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo
    })
    return report
  })
