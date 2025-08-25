import { Kysely, sql } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
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

  // Taxes
  // Tax groups consist of one or more tax rates

  await db.schema
    .createTable("tax_rates")
    .addColumn("tax_rate_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("tax_rate_name", "text", (col) => col.notNull())
    .addColumn("tax_rate_rate", "decimal(10, 2)", (col) => col.notNull())
    .addColumn("tax_rate_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("tax_rate_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db
    .insertInto("tax_rates")
    .values([
      { tax_rate_name: "GST", tax_rate_rate: 0.05 },
      { tax_rate_name: "HST - ON", tax_rate_rate: 0.13 },
      { tax_rate_name: "HST - NB", tax_rate_rate: 0.15 },
      { tax_rate_name: "HST - NS", tax_rate_rate: 0.15 },
      { tax_rate_name: "HST - NL", tax_rate_rate: 0.15 },
      { tax_rate_name: "HST - PEI", tax_rate_rate: 0.15 },
      { tax_rate_name: "PST - BC", tax_rate_rate: 0.07 },
      { tax_rate_name: "PST - SK", tax_rate_rate: 0.06 },
      { tax_rate_name: "PST - MB", tax_rate_rate: 0.07 },
      { tax_rate_name: "QST", tax_rate_rate: 0.09975 }
    ])
    .execute()

  await db.schema
    .createTable("tax_groups")
    .addColumn("tax_group_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("tax_group_name", "text", (col) => col.notNull())
    .addColumn("tax_group_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("tax_group_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("tax_group_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("tax_group_tax_rates")
    .addColumn("tax_group_tax_rate_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("tax_group_tax_rate_tax_group_id", "integer", (col) =>
      col.references("tax_groups.tax_group_id").notNull()
    )
    .addColumn("tax_group_tax_rate_tax_rate_id", "integer", (col) => col.references("tax_rates.tax_rate_id").notNull())
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

  // Product related tables

  await db.schema
    .createTable("categories")
    .addColumn("category_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("category_name", "text", (col) => col.notNull())
    .addColumn("category_description", "text")
    .addColumn("category_company_id", "integer", (col) => col.references("companies.company_id"))
    .addColumn("category_index_order", "integer", (col) => col.defaultTo(null))
    .addColumn("category_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("category_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("brands")
    .addColumn("brand_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("brand_name", "text", (col) => col.notNull())
    .addColumn("brand_description", "text")
    .addColumn("brand_company_id", "integer", (col) => col.references("companies.company_id"))
    .addColumn("brand_index_order", "integer", (col) => col.defaultTo(null))
    .addColumn("brand_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("brand_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("species")
    .addColumn("species_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("species_name", "text", (col) => col.notNull())
    .addColumn("species_description", "text")
    .addColumn("species_company_id", "integer", (col) => col.references("companies.company_id"))
    .addColumn("species_location_id", "integer", (col) => col.references("locations.location_id").defaultTo(null))
    .addColumn("species_index_order", "integer", (col) => col.defaultTo(null))
    .addColumn("species_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("species_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("products")
    .addColumn("product_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("product_name", "text", (col) => col.notNull())
    .addColumn("product_parent_sku", "text")
    .addColumn("product_description", "text")
    .addColumn("product_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("product_location_id", "integer", (col) => col.references("locations.location_id").defaultTo(null))
    .addColumn("product_category_id", "integer", (col) => col.references("categories.category_id"))
    .addColumn("product_brand_id", "integer", (col) => col.references("brands.brand_id"))
    .addColumn("product_species_id", "integer", (col) => col.references("species.species_id").defaultTo(null))
    .addColumn("product_deleted_date", "timestamp")
    .addColumn("product_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("product_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("product_variants")
    .addColumn("variant_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("variant_product_id", "integer", (col) => col.references("products.product_id").notNull())
    .addColumn("variant_name", "text", (col) => col.notNull())
    .addColumn("variant_sku", "text")
    .addColumn("variant_barcode", "text")
    .addColumn("variant_location_id", "integer", (col) => col.references("locations.location_id").defaultTo(null))
    .addColumn("variant_length_cm", "decimal(10, 2)")
    .addColumn("variant_length_ft", "decimal(10, 2)")
    .addColumn("variant_width_cm", "decimal(10, 2)")
    .addColumn("variant_width_ft", "decimal(10, 2)")
    .addColumn("variant_height_cm", "decimal(10, 2)")
    .addColumn("variant_height_ft", "decimal(10, 2)")
    .addColumn("variant_board_feet", "decimal(10, 2)")
    .addColumn("variant_board_meters", "decimal(10, 2)")
    .addColumn("variant_price_cents", "integer")
    .addColumn("variant_custom_attributes", "jsonb", (col) => col.defaultTo("[]"))
    .addColumn("variant_deleted_date", "timestamp")
    .addColumn("variant_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("variant_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  // Inventory related tables

  await db.schema
    .createTable("vendors")
    .addColumn("vendor_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("vendor_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("vendor_location_id", "integer", (col) => col.references("locations.location_id").defaultTo(null))
    .addColumn("vendor_name", "text", (col) => col.notNull())
    .addColumn("vendor_description", "text")
    .addColumn("vendor_email", "text")
    .addColumn("vendor_phone", "text")
    .addColumn("vendor_full_address", "text")
    .addColumn("vendor_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("vendor_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("product_grades")
    .addColumn("product_grade_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("product_grade_name", "text", (col) => col.notNull())
    .addColumn("product_grade_description", "text")
    .addColumn("product_grade_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("product_grade_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("product_grade_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("inventory_lots")
    .addColumn("inventory_lot_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("inventory_lot_number", "text", (col) => col.notNull())
    .addColumn("inventory_lot_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("inventory_lot_location_id", "integer", (col) => col.references("locations.location_id"))
    .addColumn("inventory_lot_product_variant_id", "integer", (col) =>
      col.references("product_variants.variant_id").notNull()
    )
    .addColumn("inventory_lot_vendor_id", "integer", (col) => col.references("vendors.vendor_id"))
    .addColumn("inventory_lot_grade_id", "integer", (col) => col.references("product_grades.product_grade_id"))
    .addColumn("inventory_lot_unit_price_cents", "integer")
    .addColumn("inventory_lot_total_price_cents", "integer")
    .addColumn("inventory_lot_unit_cost_cents", "integer")
    .addColumn("inventory_lot_total_cost_cents", "integer")
    .addColumn("inventory_lot_unit_sale_price_cents_override", "integer") // Overrides the product price on sale if exists
    .addColumn("inventory_lot_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("inventory_lot_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("inventory_lot_manufactured_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("inventory_lot_expiration_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("inventory")
    .addColumn("inventory_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("inventory_product_variant_id", "integer", (col) =>
      col.references("product_variants.variant_id").notNull()
    )
    .addColumn("inventory_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("inventory_location_id", "integer", (col) => col.references("locations.location_id").defaultTo(null))
    .addColumn("inventory_lot_id", "integer", (col) => col.references("inventory_lots.inventory_lot_id"))
    .addColumn("inventory_quantity", "integer", (col) => col.notNull())
    .addColumn("inventory_volume_cubic_meters", "integer")
    .addColumn("inventory_volume_cubic_feet", "integer")
    .addColumn("inventory_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("inventory_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  // Orders
  // Includes both purchase orders and sales orders as different types because of similarities

  await db.schema
    .createTable("customers")
    .addColumn("customer_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("customer_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("customer_location_id", "integer", (col) => col.references("locations.location_id").defaultTo(null))
    .addColumn("customer_name", "text")
    .addColumn("customer_email", "text")
    .addColumn("customer_phone", "text")
    .addColumn("customer_notes", "text")
    .addColumn("customer_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("customer_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("orders")
    .addColumn("order_id", "text", (col) => col.primaryKey())
    .addColumn("order_type", "text", (col) => col.notNull())
    .addColumn("order_number", "text")
    .addColumn("order_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("order_location_id", "integer", (col) => col.references("locations.location_id"))
    .addColumn("order_vendor_id", "integer", (col) => col.references("vendors.vendor_id"))
    .addColumn("order_customer_id", "integer", (col) => col.references("customers.customer_id"))
    .addColumn("order_status", "text", (col) => col.notNull())
    .addColumn("order_tax_group_id", "integer", (col) => col.references("tax_groups.tax_group_id"))
    .addColumn("order_subtotal_cents", "integer", (col) => col.notNull())
    .addColumn("order_tax_cents", "integer", (col) => col.notNull())
    .addColumn("order_fee_cents", "integer", (col) => col.notNull())
    .addColumn("order_total_cents", "integer", (col) => col.notNull())
    .addColumn("order_paid_cents", "integer", (col) => col.notNull())
    .addColumn("order_create_user_id", "integer", (col) => col.references("users.user_id").notNull())
    .addColumn("order_notes", "text")
    .addColumn("order_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("order_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("order_order_date", "timestamp")
    .addColumn("order_expected_delivery_date", "timestamp")
    .addColumn("order_received_date", "timestamp")
    .execute()

  await db.schema
    .createTable("order_items")
    .addColumn("order_item_id", "text", (col) => col.primaryKey())
    .addColumn("order_item_order_id", "text", (col) => col.references("orders.order_id").notNull())
    .addColumn("order_item_product_id", "integer", (col) => col.references("products.product_id"))
    .addColumn("order_item_product_sku", "text")
    .addColumn("order_item_product_name", "text", (col) => col.notNull())
    .addColumn("order_item_variant_id", "integer", (col) => col.references("product_variants.variant_id"))
    .addColumn("order_item_variant_sku", "text")
    .addColumn("order_item_variant_name", "text", (col) => col.notNull())
    .addColumn("order_item_tax_group_id_override", "integer", (col) => col.references("tax_groups.tax_group_id"))
    .addColumn("order_item_quantity_ordered", "integer", (col) => col.notNull())
    .addColumn("order_item_quantity_received", "integer")
    .addColumn("order_item_unit_cost_cents", "integer", (col) => col.notNull())
    .addColumn("order_item_total_cost_cents", "integer", (col) => col.notNull())
    .execute()

  await db.schema
    .createTable("order_item_lots")
    .addColumn("order_item_id", "text", (col) => col.references("order_items.order_item_id").notNull())
    .addColumn("order_item_lot_id", "integer", (col) => col.references("inventory_lots.inventory_lot_id").notNull())
    .addColumn("order_item_lot_quantity", "integer", (col) => col.notNull())
    .addPrimaryKeyConstraint("order_item_lots_pkey", ["order_item_id", "order_item_lot_id"])
    .execute()

  await db.schema
    .createTable("order_tax_lines")
    .addColumn("order_tax_line_id", "text", (col) => col.primaryKey())
    .addColumn("order_tax_line_order_id", "text", (col) => col.references("orders.order_id").notNull())
    .addColumn("order_tax_line_order_item_id", "text", (col) => col.references("order_items.order_item_id").notNull())
    .addColumn("order_tax_line_tax_rate_id", "integer", (col) => col.references("tax_rates.tax_rate_id"))
    .addColumn("order_tax_line_tax_amount_cents", "integer", (col) => col.notNull())
    .execute()

  await db.schema
    .createTable("order_fees")
    .addColumn("order_fee_id", "text", (col) => col.primaryKey())
    .addColumn("order_fee_order_id", "text", (col) => col.references("orders.order_id").notNull())
    .addColumn("order_fee_name", "text", (col) => col.notNull())
    .addColumn("order_fee_amount_cents", "integer", (col) => col.notNull())
    .execute()

  // Inventory transfers

  await db.schema
    .createTable("inventory_transfers")
    .addColumn("inventory_transfer_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("inventory_transfer_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("inventory_transfer_source_location_id", "integer", (col) =>
      col.references("locations.location_id").notNull()
    )
    .addColumn("inventory_transfer_destination_location_id", "integer", (col) =>
      col.references("locations.location_id").notNull()
    )
    .addColumn("inventory_transfer_status", "text", (col) => col.notNull())
    .addColumn("inventory_transfer_notes", "text")
    .addColumn("inventory_transfer_create_user_id", "integer", (col) => col.references("users.user_id").notNull())
    .addColumn("inventory_transfer_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("inventory_transfer_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("inventory_transfer_expected_arrival_date", "timestamp")
    .execute()

  await db.schema
    .createTable("inventory_transfer_items")
    .addColumn("inventory_transfer_item_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("inventory_transfer_item_transfer_id", "integer", (col) =>
      col.references("inventory_transfers.inventory_transfer_id").notNull()
    )
    .addColumn("inventory_transfer_item_product_variant_id", "integer", (col) =>
      col.references("product_variants.variant_id").notNull()
    )
    .addColumn("inventory_transfer_item_lot_id", "integer", (col) => col.references("inventory_lots.inventory_lot_id"))
    .addColumn("inventory_transfer_item_quantity", "integer", (col) => col.notNull())
    .addColumn("inventory_transfer_item_create_date", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("inventory_transfer_item_update_date", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()

  // Inventory production runs

  await db.schema
    .createTable("production_runs")
    .addColumn("production_run_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("production_run_name", "text")
    .addColumn("production_run_company_id", "integer", (col) => col.references("companies.company_id").notNull())
    .addColumn("production_run_location_id", "integer", (col) => col.references("locations.location_id").notNull())
    .addColumn("production_run_start_date", "timestamp")
    .addColumn("production_run_end_date", "timestamp")
    .addColumn("production_run_status", "text", (col) => col.notNull())
    .addColumn("production_run_notes", "text")
    .addColumn("production_run_create_user_id", "integer", (col) => col.references("users.user_id").notNull())
    .addColumn("production_run_create_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn("production_run_update_date", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createTable("production_run_input_items")
    .addColumn("production_run_input_item_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("production_run_input_item_production_run_id", "integer", (col) =>
      col.references("production_runs.production_run_id").notNull()
    )
    .addColumn("production_run_input_item_product_variant_id", "integer", (col) =>
      col.references("product_variants.variant_id").notNull()
    )
    .addColumn("production_run_input_item_lot_id", "integer", (col) =>
      col.references("inventory_lots.inventory_lot_id")
    )
    .addColumn("production_run_input_item_quantity", "integer", (col) => col.notNull())
    .addColumn("production_run_input_item_create_date", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("production_run_input_item_update_date", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()

  await db.schema
    .createTable("production_run_output_items")
    .addColumn("production_run_output_item_id", "integer", (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn("production_run_output_item_production_run_id", "integer", (col) =>
      col.references("production_runs.production_run_id").notNull()
    )
    .addColumn("production_run_output_item_product_variant_id", "integer", (col) =>
      col.references("product_variants.variant_id").notNull()
    )
    .addColumn("production_run_output_item_lot_id", "integer", (col) =>
      col.references("inventory_lots.inventory_lot_id")
    )
    .addColumn("production_run_output_item_quantity", "integer", (col) => col.notNull())
    .addColumn("production_run_output_item_create_date", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("production_run_output_item_update_date", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
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

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("integrations_lisa").execute()
  await db.schema.dropTable("activity_logs").execute()

  await db.schema.dropTable("production_run_output_items").execute()
  await db.schema.dropTable("production_run_input_items").execute()
  await db.schema.dropTable("production_runs").execute()

  await db.schema.dropTable("inventory_transfer_items").execute()
  await db.schema.dropTable("inventory_transfers").execute()

  await db.schema.dropTable("order_fees").execute()
  await db.schema.dropTable("order_tax_lines").execute()
  await db.schema.dropTable("order_items").execute()
  await db.schema.dropTable("orders").execute()
  await db.schema.dropTable("customers").execute()

  await db.schema.dropTable("inventory").execute()
  await db.schema.dropTable("inventory_lots").execute()
  await db.schema.dropTable("product_grades").execute()
  await db.schema.dropTable("vendors").execute()

  await db.schema.dropTable("products").execute()
  await db.schema.dropTable("species").execute()
  await db.schema.dropTable("categories").execute()

  await db.schema.dropTable("user_assignments").execute()
  await db.schema.dropTable("security_role_permissions").execute()
  await db.schema.dropTable("permissions").execute()
  await db.schema.dropTable("security_roles").execute()

  await db.schema.dropTable("tax_group_tax_rates").execute()
  await db.schema.dropTable("tax_groups").execute()
  await db.schema.dropTable("tax_rates").execute()

  await db.schema.dropTable("locations").execute()
  await db.schema.dropTable("companies").execute()

  await db.schema.dropTable("users").execute()
}
