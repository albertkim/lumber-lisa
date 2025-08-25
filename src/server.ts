import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server"
import { randomUUID } from "crypto"
import { db, migrator } from "./database"
import { createRouter } from "./router"
import { AdminService } from "./services/AdminService"
import { SeedDataService } from "./services/SeedDataService"

console.log("Server starting...")

// Run Kysely database migrations

async function createInitialUserIfNotExists() {
  // If there are no users in the database, create an admin user
  const existingUsers = await db.selectFrom("users").select(db.fn.count("user_id").as("count")).execute()

  const existingUsersCount = parseInt(existingUsers[0].count as string)

  if (existingUsersCount === 0) {
    console.log("No users found, creating admin user")
    const adminEmail = "albert275@gmail.com"
    const adminPassword = randomUUID()
    const { user, company } = await AdminService.registerNewCompany({
      companyName: "Lumber Co",
      companySubscriptionStatus: "active",
      userEmail: adminEmail,
      userFullName: "Albert",
      userPassword: adminPassword
    })
    await db.updateTable("users").set({ user_is_admin: true }).where("user_email", "=", adminEmail).execute()
    console.log(`Admin user created: ${adminEmail} with password: ${adminPassword}`)
    // Seed the database with some data
    console.log("Seeding database with some data...")
    await SeedDataService.seedData(user, company)
    console.log("Database seeding complete")
  }
}

async function migrate() {
  console.log("Migrating database...")
  const { error, results } = await migrator.migrateToLatest()
  if (error) {
    console.error(error)
    throw error
  } else {
    console.log(`Migration results: ${results}`)
  }

  await createInitialUserIfNotExists()
}

migrate()

export default createStartHandler({
  createRouter
})(defaultStreamHandler)
