import { Company, CompanySchema, DefaultMeasurementUnit, UpdateCompany } from "@/models"
import { db } from "@/server/database"
import { createError } from "@tanstack/react-start/server"

export const CompanyRepository = {
  async getCompanyById(companyId: number): Promise<Company> {
    const companyResult = await db
      .selectFrom("companies")
      .leftJoin("integrations_lisa", "companies.company_id", "integrations_lisa.integrations_lisa_company_id")
      .selectAll("companies")
      .select(["integrations_lisa.integrations_lisa_create_date as lisa_create_date"])
      .where("company_id", "=", companyId)
      .executeTakeFirst()
    if (!companyResult) {
      throw createError({
        status: 404,
        message: "Company not found"
      })
    }

    const locationsResult = await db
      .selectFrom("locations")
      .where("location_company_id", "=", companyId)
      .selectAll()
      .execute()

    const company: Company = {
      companyId: companyResult.company_id,
      companyName: companyResult.company_name,
      companySubscriptionStatus: companyResult.company_subscription_status,
      companyDefaultMeasurementUnit: companyResult.company_default_measurement_unit as DefaultMeasurementUnit,
      companyIsDeleted: companyResult.company_is_deleted,
      companyCreateDate: companyResult.company_create_date.toISOString(),
      companyUpdateDate: companyResult.company_update_date.toISOString(),
      companyLocations: locationsResult.map((location) => ({
        locationId: location.location_id,
        locationName: location.location_name,
        locationCompanyId: location.location_company_id,
        locationCreateDate: location.location_create_date.toISOString(),
        locationUpdateDate: location.location_update_date.toISOString()
      })),
      companyIntegrations: {
        lisa: !!companyResult.lisa_create_date
      }
    }
    const validatedCompany = CompanySchema.parse(company)
    return validatedCompany
  },

  async updateCompany(companyId: number, company: UpdateCompany): Promise<Company> {
    await db
      .updateTable("companies")
      .set({
        company_name: company.companyName,
        company_default_measurement_unit: company.companyDefaultMeasurementUnit
      })
      .where("company_id", "=", companyId)
      .returningAll()
      .executeTakeFirst()

    const updatedCompany = await this.getCompanyById(companyId)
    return updatedCompany
  }
}
