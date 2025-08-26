import { AdminRegisterNewCompany, Company } from "@/models"
import { db } from "@/server/database"
import { createError } from "@tanstack/react-start/server"
import { CompanyRepository } from "./CompanyRepository"

export const AdminRepository = {
  async createCompany(createCompany: AdminRegisterNewCompany): Promise<Company> {
    const companyResult = await db
      .insertInto("companies")
      .values({
        company_name: createCompany.companyName,
        company_subscription_status: createCompany.companySubscriptionStatus,
        company_default_measurement_unit: "ft"
      })
      .returningAll()
      .executeTakeFirst()

    if (!companyResult) {
      throw createError({
        status: 500,
        message: "Failed to create company"
      })
    }

    const company = await CompanyRepository.getCompanyById(companyResult.company_id)

    if (!company) {
      throw createError({
        status: 500,
        message: "Failed to create company"
      })
    }
    return company
  }
}
