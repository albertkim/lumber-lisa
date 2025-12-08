import { promises as fs } from "fs"
import os from "os"
import path from "path"
import { Company } from "@/models"
import { DuckDBInstance } from "@duckdb/node-api"
import { IntegrationService } from "./IntegrationService"
import { DuckDB } from "../database/DuckDBModels"
import { Kysely } from "kysely"
import { DuckDbDialect } from "kysely-duckdb"

export const AIService = {
  buildInventoryDuckDB: async (company: Company) => {
    const inventoryReport =
      await IntegrationService.runLisaCurrentInventoryQuery(company)

    const instance = await DuckDBInstance.create(":memory:")
    const connection = await instance.connect()

    // 1) Write JSON to a temp file
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "duckdb-inventory-"))
    const jsonPath = path.join(tmpDir, "inventory.json")

    // inventoryReport.data should be an array of objects
    await fs.writeFile(jsonPath, JSON.stringify(inventoryReport.data), "utf8")

    // 2) Load it via read_json / read_json_auto
    await connection.run(
      `CREATE TABLE inventory AS
       SELECT * FROM read_json_auto(?)`,
      [jsonPath]
    )

    // 3) Wrap with Kysely
    const kyselyInstance = new Kysely<DuckDB>({
      dialect: new DuckDbDialect({
        database: instance,
        tableMappings: {},
      }),
    })

    return kyselyInstance
  },
}
