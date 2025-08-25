import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server"
import { migrator } from "./database"
import { createRouter } from "./router"

console.log("Server starting...")

// Run Kysely database migrations

async function migrate() {
  console.log("Migrating database...")
  const { error, results } = await migrator.migrateToLatest()
  if (error) {
    console.error(error)
    throw error
  } else {
    console.log(`Migration results: ${results}`)
  }
}

migrate()

export default createStartHandler({
  createRouter
})(defaultStreamHandler)
