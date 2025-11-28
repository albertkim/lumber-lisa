import { CompanyService } from "@/server/services/CompanyService"
import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { authMiddleware } from "./middleware/auth-middleware"
import { userBelongsToCompanyMiddleware } from "./middleware/belongs-to-company-middleware"

export const getCompany = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .inputValidator(z.object({ companyId: z.number() }))
  .handler(async ({ context, data }) => {
    const { user } = context
    const company = await CompanyService.getCompanyById(data.companyId)
    if (user.isAdmin || user.company.companyId === company.companyId) {
      return company
    }
    throw Error("Unauthorized, user does not belong to company")
  })
