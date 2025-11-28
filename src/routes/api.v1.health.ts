import { db } from "@/server/database"
import { createFileRoute } from "@tanstack/react-router"
import { sql } from "kysely"

export const Route = createFileRoute("/api/v1/health")({
  server: {
    handlers: {
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
    }
  }
})
