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
      const normalizedResult = normalizeDuckValue(result.rows)
      // Return maximum of 100 rows
      return normalizedResult.slice(0, MAX_ROWS)
    },
  })
}

// Generic normalizer for DuckDB result values.
// Recursively converts BigInt to Number, and is extensible for more types later.
export function normalizeDuckValue(value: any): any {
  if (typeof value === "bigint") {
    return Number(value)
  }

  if (Array.isArray(value)) {
    return value.map(normalizeDuckValue)
  }

  if (value !== null && typeof value === "object") {
    const out: Record<string, any> = {}
    for (const [k, v] of Object.entries(value)) {
      out[k] = normalizeDuckValue(v)
    }
    return out
  }

  return value
}
