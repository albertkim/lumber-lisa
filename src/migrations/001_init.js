import { sql } from "kysely"

export async function up(db) {
  await db.schema
    .createTable("users")
    .addColumn("user_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("user_full_name", "text")
    .addColumn("user_email", "text")
    .addColumn("user_encrypted_password", "text")
    .addColumn("user_is_admin", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("user_is_deleted", "timestamp", (col) => col.defaultTo(null))
    .addColumn("user_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("user_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("auth_tokens")
    .addColumn("auth_token_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("auth_token_user_id", "integer", (col) => col.references("users.user_id").notNull())
    .addColumn("auth_token_token", "text", (col) => col.notNull())
    .addColumn("auth_token_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("reset_password_tokens")
    .addColumn("reset_password_token_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("reset_password_token_user_id", "integer", (col) => col.references("users.user_id").notNull())
    .addColumn("reset_password_token_token", "text", (col) => col.notNull())
    .addColumn("reset_password_token_create_date", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()

  await db.schema
    .createTable("companies")
    .addColumn("company_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("company_name", "text", (col) => col.notNull())
    .addColumn("company_subscription_status", "text", (col) => col.notNull())
    .addColumn("company_default_measurement_unit", "text", (col) => col.notNull())
    .addColumn("company_admin_notes", "text")
    .addColumn("company_is_deleted", "timestamp", (col) => col.defaultTo(null))
    .addColumn("company_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("company_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("locations")
    .addColumn("location_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("location_name", "text", (col) => col.notNull())
    .addColumn("location_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("location_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("location_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  // User and security related tables
  // Security roles are associated with pre-defined permissions

  await db.schema
    .createTable("security_roles")
    .addColumn("security_role_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("security_role_name", "text", (col) => col.notNull())
    .addColumn("security_role_description", "text")
    .addColumn("security_role_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("security_role_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("security_role_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("permissions")
    .addColumn("permission_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("permission_name", "text", (col) => col.unique().notNull())
    .addColumn("permission_description", "text")
    .addColumn("permission_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("permission_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db
    .insertInto("permissions")
    .values([
      { permission_name: "Can view company details", permission_description: "Can view company details" },
      { permission_name: "Can edit company details", permission_description: "Can edit company details" },
      { permission_name: "Can view products", permission_description: "Can view products" },
      { permission_name: "Can edit products", permission_description: "Can edit products" },
      { permission_name: "Can view inventory", permission_description: "Can view inventory" },
      { permission_name: "Can edit inventory", permission_description: "Can edit inventory" },
      { permission_name: "Can view sales", permission_description: "Can view sales orders" },
      { permission_name: "Can edit sales", permission_description: "Can edit sales orders" },
      { permission_name: "Can view reports", permission_description: "Can view reports" },
      { permission_name: "Can edit reports", permission_description: "Can edit reports" }
    ])
    .execute()

  await db.schema
    .createTable("security_role_permissions")
    .addColumn("security_role_permission_security_role_id", "integer", (col) =>
      col.references("security_roles.security_role_id").notNull()
    )
    .addColumn("security_role_permission_permission_id", "integer", (col) =>
      col.references("permissions.permission_id").notNull()
    )
    .addColumn("security_role_permission_create_date", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("security_role_permission_update_date", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addPrimaryKeyConstraint("security_role_permissions_pkey", [
      "security_role_permission_security_role_id",
      "security_role_permission_permission_id"
    ])
    .addUniqueConstraint("security_role_permissions_unique", [
      "security_role_permission_security_role_id",
      "security_role_permission_permission_id"
    ])
    .execute()

  await db.schema
    .createTable("user_assignments")
    .addColumn("assignment_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("assignment_user_id", "integer", (col) => col.references("users.user_id").notNull())
    .addColumn("assignment_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("assignment_location_id", "integer", (col) => col.references("locations.location_id")) // Null means the assignment applies to all locations in the company
    .addColumn("assignment_security_role_id", "integer", (col) => col.references("security_roles.security_role_id"))
    .addUniqueConstraint("user_assignment_unique", [
      "assignment_user_id",
      "assignment_company_id",
      "assignment_location_id"
    ])
    .execute()

  // Activity logs

  await db.schema
    .createTable("activity_logs")
    .addColumn("activity_log_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("activity_log_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("activity_log_user_id", "integer", (col) => col.references("users.user_id").notNull())
    .addColumn("activity_log_user_full_name", "text")
    .addColumn("activity_log_user_email", "text")
    .addColumn("activity_log_action", "text", (col) => col.notNull())
    .addColumn("activity_log_type", "text", (col) => col.notNull())
    .addColumn("activity_log_title", "text", (col) => col.notNull())
    .addColumn("activity_log_description", "text", (col) => col.notNull())
    .addColumn("activity_log_data", "jsonb", (col) => col.notNull())
    .addColumn("activity_log_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("integrations_lisa")
    .addColumn("integrations_lisa_company_id", "integer", (col) =>
      col.references("companies.company_id").notNull().unique().primaryKey()
    )
    .addColumn("integrations_lisa_database_host", "text", (col) => col.notNull())
    .addColumn("integrations_lisa_database_username", "text", (col) => col.notNull())
    .addColumn("integrations_lisa_database_password", "text", (col) => col.notNull())
    .addColumn("integrations_lisa_database_name", "text", (col) => col.notNull())
    .addColumn("integrations_lisa_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()
}

export async function down(db) {
  await db.schema.dropTable("integrations_lisa").execute()
  await db.schema.dropTable("activity_logs").execute()

  await db.schema.dropTable("user_assignments").execute()
  await db.schema.dropTable("security_role_permissions").execute()
  await db.schema.dropTable("permissions").execute()
  await db.schema.dropTable("security_roles").execute()

  await db.schema.dropTable("locations").execute()
  await db.schema.dropTable("companies").execute()

  await db.schema.dropTable("reset_password_tokens").execute()
  await db.schema.dropTable("auth_tokens").execute()
  await db.schema.dropTable("users").execute()
}
