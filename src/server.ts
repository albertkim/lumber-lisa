import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server"
import { migrator } from "./database"
import { createRouter } from "./router"

console.log("Server starting...")

// Run Kysely database migrations
migrator.migrateToLatest()

export default createStartHandler({
  createRouter
})(defaultStreamHandler)
