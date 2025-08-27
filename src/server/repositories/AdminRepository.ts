import { AdminCompaniesWithDetailsResponse, AdminRegisterNewCompany, Company } from "@/models"
import { db } from "@/server/database"
import { createError } from "@tanstack/react-start/server"
import { CompanyRepository } from "./CompanyRepository"

export const AdminRepository = {
  async getCompanies(): Promise<AdminCompaniesWithDetailsResponse> {
    // Get all non-deleted companies
    const companies = await db
      .selectFrom("companies")
      .select([
        "company_id",
        "company_name",
        "company_subscription_status",
        "company_default_measurement_unit",
        "company_admin_notes",
        "company_create_date",
        "company_update_date"
      ])
      .where("company_is_deleted", "is", null)
      .orderBy("company_id", "asc")
      .execute()

    // Get all non-deleted locations
    const locations = await db
      .selectFrom("locations")
      .select(["location_id", "location_name", "location_company_id", "location_create_date", "location_update_date"])
      .execute()

    // Get all users with their company assignments and security roles
    const users = await db
      .selectFrom("users")
      .innerJoin("user_assignments", "user_assignments.assignment_user_id", "users.user_id")
      .innerJoin("security_roles", "security_roles.security_role_id", "user_assignments.assignment_security_role_id")
      .innerJoin("companies", "companies.company_id", "user_assignments.assignment_company_id")
      .select([
        "users.user_id",
        "users.user_full_name",
        "users.user_email",
        "users.user_is_admin",
        "security_roles.security_role_id",
        "companies.company_id",
        "companies.company_name"
      ])
      .where("users.user_is_deleted", "is", null)
      .where("companies.company_is_deleted", "is", null)
      .execute()

    return {
      data: companies.map((company) => ({
        companyId: company.company_id,
        companyName: company.company_name,
        companySubscriptionStatus: company.company_subscription_status,
        companyDefaultMeasurementUnit: company.company_default_measurement_unit as "ft" | "m",
        companyIsDeleted: company.company_admin_notes, // Using admin_notes field as is_deleted equivalent
        companyCreateDate: company.company_create_date.toISOString(),
        companyUpdateDate: company.company_update_date.toISOString(),
        companyLocations: locations
          .filter((location) => location.location_company_id === company.company_id)
          .map((location) => ({
            locationId: location.location_id,
            locationName: location.location_name,
            locationCompanyId: location.location_company_id,
            locationCreateDate: location.location_create_date.toISOString(),
            locationUpdateDate: location.location_update_date.toISOString()
          })),
        companyIntegrations: {
          lisa: false // Default to false, can be enhanced later
        },
        users: users
          .filter((user) => user.company_id === company.company_id)
          .map((user) => ({
            userId: user.user_id,
            userFullName: user.user_full_name,
            userEmail: user.user_email!,
            isAdmin: user.user_is_admin,
            securityRoleId: user.security_role_id,
            company: {
              companyId: user.company_id,
              companyName: user.company_name
            }
          }))
      })),
      total: companies.length
    }
  },

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
