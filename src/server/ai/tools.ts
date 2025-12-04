import { tool } from "ai"
import { sql } from "kysely"
import { z } from "zod"
import { AIService } from "../services/AIService"
import { Company } from "@/models"

const MAX_ROWS = 100

export const getTableQueryDuckDBTool = async function (
  company: Company
) {
  const duckDBInstance = await AIService.buildInventoryDuckDB(company)
  return tool({
    description: "Use this tool to query the DuckDB database. Limit the number of rows to 100.",
    inputSchema: z.object({
      query: z.string(),
    }),
    execute: async ({ query }) => {
      console.log(`Running SQL query: ${query}`)
      const result = await sql(query as any).execute(duckDBInstance)
      // Return maximum of 100 rows
      return result.rows.slice(0, MAX_ROWS)
    },
  })
}