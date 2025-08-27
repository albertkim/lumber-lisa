import { sql } from "kysely"
import { beforeAll } from "vitest"
import { config, db, migrator } from "../database"
import { login } from "../server-functions/login"
import { AdminService } from "../services/AdminService"
import { UserService } from "../services/UserService"
import { Globals } from "./Globals"

beforeAll(async () => {
  console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`)

  // Make sure we're running the tests with the test environment
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Tests must be run with the test environment")
  }

  // Confirm that the database name is lumber_test to make sure we're not accidentally using the production database
  if (config.database !== "lumber_test") {
    throw new Error("Tests must be run with the lumber_test database")
  } else {
    console.log("Tests are correctly running with the lumber_test database")
  }

  // Clear the test database
  console.log("Clearing public schema")
  await sql`DROP SCHEMA IF EXISTS public CASCADE`.execute(db)
  console.log("Creating public schema")
  await sql`CREATE SCHEMA public`.execute(db)

  // Run migrations
  console.log("Running migrations")
  const { error, results } = await migrator.migrateToLatest()
  console.log(results)
  if (error) {
    console.error(error)
    throw error
  }

  // Insert admin user
  console.log("Creating new company with admin user")
  const createCompanyResponse = await AdminService.registerNewCompany({
    companyName: "Lumber Co",
    companySubscriptionStatus: "active",
    userEmail: Globals.adminUser.userEmail,
    userFullName: Globals.adminUser.userFullName,
    userPassword: Globals.adminUser.userPassword
  })

  console.log(createCompanyResponse)

  Globals.company.companyId = createCompanyResponse.company.companyId
  Globals.location.locationCompanyId = createCompanyResponse.company.companyId
  Globals.adminUser.userId = createCompanyResponse.user.userId

  // Run DB query to set user as admin
  await db.updateTable("users").set({ user_is_admin: true }).where("user_id", "=", Globals.adminUser.userId).execute()
  console.log("Admin user set as admin")

  // Login as admin user
  // First, reset password
  const resetPasswordToken = await UserService.createResetPasswordTokenAndSendEmail({
    userEmail: Globals.adminUser.userEmail,
    userFullName: Globals.adminUser.userFullName,
    company: Globals.company,
    userId: Globals.adminUser.userId,
    isAdmin: true, // Not used here, just a placeholder
    securityRoleId: 1 // Not used here, just a placeholder
  })
  console.log(resetPasswordToken)
  await UserService.resetPassword(resetPasswordToken, Globals.adminUser.userPassword)
  console.log("Admin user password reset")

  // Then log in
  const loginResponse = await login({
    data: {
      email: Globals.adminUser.userEmail,
      password: Globals.adminUser.userPassword
    }
  })
  console.log("Setup login response")
  console.log(loginResponse)
  Globals.adminUser.userAuthToken = loginResponse.token

  // Locations
  console.log("Create second location")
  await db
    .insertInto("locations")
    .values([
      {
        location_name: "Main Warehouse",
        location_company_id: Globals.company.companyId
      }
    ])
    .execute()

  // Assign user
  await db
    .insertInto("user_assignments")
    .values([
      {
        assignment_user_id: Globals.adminUser.userId,
        assignment_company_id: Globals.company.companyId,
        assignment_location_id: null,
        assignment_security_role_id: 1
      }
    ])
    .execute()

  console.log("Mock data inserted")
  console.log("Setup complete")
})
