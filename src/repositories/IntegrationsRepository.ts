import { db } from "../database"
import { Integrations, UpdateIntegrations } from "../models"

export const IntegrationsRepository = {
  async getIntegrations(companyId: number): Promise<Integrations> {
    const lisa_integrations = await db
      .selectFrom("integrations_lisa")
      .where("integrations_lisa_company_id", "=", companyId)
      .selectAll()
      .executeTakeFirst()

    return {
      lisa: lisa_integrations
        ? {
            databaseHost: lisa_integrations.integrations_lisa_database_host,
            databaseUsername: lisa_integrations.integrations_lisa_database_username,
            databasePassword: lisa_integrations.integrations_lisa_database_password,
            databaseName: lisa_integrations.integrations_lisa_database_name
          }
        : null
    }
  },
  async updateIntegrations(companyId: number, integrations: UpdateIntegrations): Promise<Integrations> {
    // Update the Lisa integrations - remove if null
    if (integrations.lisa) {
      // Check if the integration exists first
      const existingIntegration = await db
        .selectFrom("integrations_lisa")
        .where("integrations_lisa_company_id", "=", companyId)
        .selectAll()
        .executeTakeFirst()

      if (existingIntegration) {
        // Update existing integration
        await db
          .updateTable("integrations_lisa")
          .where("integrations_lisa_company_id", "=", companyId)
          .set({
            integrations_lisa_database_host: integrations.lisa.databaseHost,
            integrations_lisa_database_username: integrations.lisa.databaseUsername,
            integrations_lisa_database_password: integrations.lisa.databasePassword,
            integrations_lisa_database_name: integrations.lisa.databaseName
          })
          .execute()
      } else {
        // Insert new integration
        await db
          .insertInto("integrations_lisa")
          .values({
            integrations_lisa_company_id: companyId,
            integrations_lisa_database_host: integrations.lisa.databaseHost,
            integrations_lisa_database_username: integrations.lisa.databaseUsername,
            integrations_lisa_database_password: integrations.lisa.databasePassword,
            integrations_lisa_database_name: integrations.lisa.databaseName
          })
          .execute()
      }
    } else {
      await db.deleteFrom("integrations_lisa").where("integrations_lisa_company_id", "=", companyId).execute()
    }

    return await IntegrationsRepository.getIntegrations(companyId)
  }
}
