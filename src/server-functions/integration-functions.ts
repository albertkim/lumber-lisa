import { UpdateIntegrationsSchema } from "@/models"
import { CompanyService } from "@/services/CompanyService"
import { IntegrationService } from "@/services/IntegrationService"
import { createServerFn } from "@tanstack/react-start"
import { authMiddleware } from "./middleware/auth-middleware"

export const getIntegrations = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { companyId: number }) => d)
  .handler(async ({ data, context }) => {
    const companyId = data.companyId
    const company = await CompanyService.getCompanyById(companyId)
    const integrations = await IntegrationService.getIntegrations(companyId)
    return integrations
  })

export const updateIntegrations = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(UpdateIntegrationsSchema)
  .handler(async ({ data, context }) => {
    const companyId = data.companyId
    const updateIntegration = UpdateIntegrationsSchema.parse(data)
    const company = await CompanyService.getCompanyById(companyId)
    const updatedIntegrations = await IntegrationService.updateIntegrations(companyId, updateIntegration)
    return updatedIntegrations
  })
