import { UpdateCompanySchema } from "@/models"
import { ActivityLogService } from "@/server/services/ActivityLogService"
import { CompanyService } from "@/server/services/CompanyService"
import { createServerFn } from "@tanstack/react-start"
import { authMiddleware } from "./middleware/auth-middleware"
import { userBelongsToCompanyMiddleware } from "./middleware/belongs-to-company-middleware"

export const updateCompany = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .inputValidator(UpdateCompanySchema)
  .handler(async ({ data, context }) => {
    const user = context.user
    const updateCompany = UpdateCompanySchema.parse(data)

    const companyId = updateCompany.companyId
    const company = await CompanyService.getCompanyById(companyId)

    const updatedCompany = await CompanyService.updateCompany(updateCompany.companyId, updateCompany)

    await ActivityLogService.createActivityLog({
      companyId,
      userId: user.userId,
      userFullName: user.userFullName ?? null,
      userEmail: user.userEmail ?? null,
      action: "update",
      type: "settings",
      title: "Company updated",
      description: `Company ${company.companyName} updated`,
      data: company
    })

    return updatedCompany
  })
