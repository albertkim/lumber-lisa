import { createServerFileRoute } from "@tanstack/react-start/server"
import { sql } from "kysely"
import { db } from "../database"

export const ServerRoute = createServerFileRoute("/api/v1/health").methods({
  GET: async () => {
    await sql`SELECT 1+1`.execute(db)
    return new Response(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        commit: process.env.GITHUB_SHA,
        status: "OK"
      })
    )
  }
})
