import { Company } from "@/models"
import { DuckDBInstance } from "@duckdb/node-api"
import { IntegrationService } from "./IntegrationService"

export const AIService = {
  buildInventoryDuckDB: async (company: Company) => {
    const inventoryReport = await IntegrationService.runLisaInventoryQuantityQuery(company)

    // Build a DuckDB database from the inventory report
    const instance = await DuckDBInstance.create(":memory:")

    // Load the inventory report into the DuckDB database
    const connection = await instance.connect()

    await connection.run(`
      CREATE TABLE inventory AS SELECT * FROM read_json('${JSON.stringify(inventoryReport.data)}')
    `)

    return instance
  }
}
