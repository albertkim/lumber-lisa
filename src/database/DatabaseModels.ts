import { Generated, JSONColumnType } from "kysely"

export interface DB {
  users: Users
  auth_tokens: AuthTokens
  reset_password_tokens: ResetPasswordTokens
  companies: Companies
  locations: Locations
  tax_rates: TaxRates
  tax_groups: TaxGroups
  tax_group_tax_rates: TaxGroupTaxRates
  security_roles: SecurityRoles
  permissions: Permissions
  security_role_permissions: SecurityRolePermissions
  user_assignments: UserAssignments
  categories: Categories
  brands: Brands
  species: Species
  products: Products
  product_variants: ProductVariants
  vendors: Vendors
  product_grades: ProductGrades
  inventory_lots: InventoryLots
  inventory: Inventory
  customers: Customers
  orders: Orders
  order_item_lots: OrderItemLots
  order_items: OrderItems
  order_tax_lines: OrderTaxLines
  order_fees: OrderFees
  inventory_transfers: InventoryTransfers
  inventory_transfer_items: InventoryTransferItems
  production_runs: ProductionRuns
  production_run_input_items: ProductionRunInputItems
  production_run_output_items: ProductionRunOutputItems
  activity_logs: ActivityLogs
  integrations_lisa: IntegrationsLisa
}

export interface Users {
  user_id: Generated<number>
  user_full_name: string | null
  user_email: string | null
  user_encrypted_password: string | null
  user_is_admin: boolean
  user_is_deleted: string | null
  user_create_date: Generated<string>
  user_update_date: Generated<string>
}

export interface AuthTokens {
  auth_token_id: Generated<number>
  auth_token_user_id: number
  auth_token_token: string
  auth_token_create_date: Generated<string>
}

export interface ResetPasswordTokens {
  reset_password_token_id: Generated<number>
  reset_password_token_user_id: number
  reset_password_token_token: string
  reset_password_token_create_date: Generated<string>
}

export interface Companies {
  company_id: Generated<number>
  company_name: string
  company_subscription_status: string
  company_default_measurement_unit: string
  company_admin_notes: string | null
  company_is_deleted: string | null
  company_create_date: Generated<Date>
  company_update_date: Generated<Date>
}

export interface Locations {
  location_id: Generated<number>
  location_name: string
  location_company_id: number
  location_create_date: Generated<Date>
  location_update_date: Generated<Date>
}

export interface TaxRates {
  tax_rate_id: Generated<number>
  tax_rate_name: string
  tax_rate_rate: number
  tax_rate_create_date: Generated<Date>
  tax_rate_update_date: Generated<Date>
}

export interface TaxGroups {
  tax_group_id: Generated<number>
  tax_group_name: string
  tax_group_company_id: number
  tax_group_create_date: Generated<Date>
  tax_group_update_date: Generated<Date>
}

export interface TaxGroupTaxRates {
  tax_group_tax_rate_id: Generated<number>
  tax_group_tax_rate_tax_group_id: number
  tax_group_tax_rate_tax_rate_id: number
}

export interface SecurityRoles {
  security_role_id: Generated<number>
  security_role_company_id: number
  security_role_name: string
  security_role_description: string | null
  security_role_create_date: Generated<Date>
  security_role_update_date: Generated<Date>
}

export interface Permissions {
  permission_id: Generated<number>
  permission_name: string
  permission_description: string
  permission_create_date: Generated<Date>
  permission_update_date: Generated<Date>
}

export interface SecurityRolePermissions {
  security_role_permission_security_role_id: number
  security_role_permission_permission_id: number
  security_role_permission_create_date: Generated<Date>
  security_role_permission_update_date: Generated<Date>
}

export interface UserAssignments {
  assignment_id: Generated<number>
  assignment_user_id: number
  assignment_company_id: number
  assignment_location_id: number | null
  assignment_security_role_id: number
}

export interface Categories {
  category_id: Generated<number>
  category_name: string
  category_description: string | null
  category_company_id: number
  category_index_order: number | null
  category_create_date: Generated<Date>
  category_update_date: Generated<Date>
}

export interface Brands {
  brand_id: Generated<number>
  brand_name: string
  brand_description: string | null
  brand_company_id: number
  brand_index_order: number | null
  brand_create_date: Generated<Date>
  brand_update_date: Generated<Date>
}

export interface Species {
  species_id: Generated<number>
  species_name: string
  species_description: string | null
  species_company_id: number
  species_location_id: number | null
  species_index_order: number | null
  species_create_date: Generated<Date>
  species_update_date: Generated<Date>
}

export interface Products {
  product_id: Generated<number>
  product_name: string
  product_parent_sku: string | null
  product_description: string | null
  product_company_id: number
  product_location_id: number | null
  product_category_id: number | null
  product_species_id: number | null
  product_brand_id: number | null
  product_deleted_date: Date | null
  product_create_date: Generated<Date>
  product_update_date: Generated<Date>
}

export interface ProductVariants {
  variant_id: Generated<number>
  variant_product_id: number
  variant_name: string
  variant_sku: string | null
  variant_barcode: string | null
  variant_length_cm: number | null
  variant_length_ft: number | null
  variant_width_cm: number | null
  variant_width_ft: number | null
  variant_height_cm: number | null
  variant_height_ft: number | null
  variant_board_feet: number | null
  variant_board_meters: number | null
  variant_price_cents: number | null
  variant_custom_attributes: JSONColumnType<string[] | null>
  variant_deleted_date: Date | null
  variant_create_date: Generated<Date>
  variant_update_date: Generated<Date>
}

export interface Vendors {
  vendor_id: Generated<number>
  vendor_company_id: number
  vendor_location_id: number | null
  vendor_name: string
  vendor_description: string | null
  vendor_email: string | null
  vendor_phone: string | null
  vendor_full_address: string | null
  vendor_create_date: Generated<Date>
  vendor_update_date: Generated<Date>
}

export interface ProductGrades {
  product_grade_id: Generated<number>
  product_grade_name: string
  product_grade_description: string | null
  product_grade_company_id: number
}

export interface InventoryLots {
  inventory_lot_id: Generated<number>
  inventory_lot_number: string
  inventory_lot_company_id: number
  inventory_lot_location_id: number
  inventory_lot_product_variant_id: number
  inventory_lot_vendor_id: number | null
  inventory_lot_grade_id: number | null
  inventory_lot_unit_price_cents: number | null
  inventory_lot_total_price_cents: number | null
  inventory_lot_unit_cost_cents: number | null
  inventory_lot_total_cost_cents: number | null
  inventory_lot_unit_sale_price_cents_override: number | null
  inventory_lot_create_date: Generated<string>
  inventory_lot_update_date: Generated<string>
  inventory_lot_manufactured_date: string | null
  inventory_lot_expiration_date: string | null
}

export interface Inventory {
  inventory_id: Generated<number>
  inventory_product_variant_id: number
  inventory_company_id: number
  inventory_location_id: number
  inventory_lot_id: number
  inventory_quantity: number
  inventory_volume_cubic_meters: number | null
  inventory_volume_cubic_feet: number | null
  inventory_create_date: Generated<Date>
  inventory_update_date: Generated<Date>
}

export interface Customers {
  customer_id: Generated<number>
  customer_company_id: number
  customer_location_id: number | null
  customer_name: string
  customer_email: string | null
  customer_phone: string | null
  customer_notes: string | null
  customer_create_date: Generated<Date>
  customer_update_date: Generated<Date>
}

export interface Orders {
  order_id: string
  order_type: string
  order_number: string | null
  order_company_id: number
  order_location_id: number
  order_vendor_id: number | null
  order_customer_id: number | null
  order_status: string
  order_tax_group_id: number | null
  order_subtotal_cents: number
  order_tax_cents: number
  order_fee_cents: number
  order_total_cents: number
  order_paid_cents: number
  order_create_user_id: number
  order_notes: string | null
  order_create_date: Generated<Date>
  order_update_date: Generated<Date>
  order_order_date: Date | null
  order_expected_delivery_date: Date | null
  order_received_date: Date | null
}

export interface OrderItemLots {
  order_item_id: string
  order_item_lot_id: number
  order_item_lot_quantity: number
}

export interface OrderItems {
  order_item_id: string
  order_item_order_id: string
  order_item_product_id: number
  order_item_product_sku: string | null
  order_item_product_name: string
  order_item_variant_id: number
  order_item_variant_sku: string | null
  order_item_variant_name: string
  order_item_tax_group_id_override: number | null
  order_item_quantity_ordered: number
  order_item_quantity_received: number | null
  order_item_unit_cost_cents: number
  order_item_total_cost_cents: number
  order_item_create_date: Generated<Date>
  order_item_update_date: Generated<Date>
}

export interface OrderTaxLines {
  order_tax_line_id: string
  order_tax_line_order_id: string
  order_tax_line_tax_rate_id: number | null
  order_tax_line_tax_amount_cents: number
  order_tax_line_create_date: Generated<Date>
  order_tax_line_update_date: Generated<Date>
}

export interface OrderFees {
  order_fee_id: string
  order_fee_order_id: string
  order_fee_name: string
  order_fee_amount_cents: number
  order_fee_create_date: Generated<Date>
  order_fee_update_date: Generated<Date>
}

export interface InventoryTransfers {
  inventory_transfer_id: Generated<number>
  inventory_transfer_company_id: number
  inventory_transfer_source_location_id: number
  inventory_transfer_destination_location_id: number
  inventory_transfer_status: string
  inventory_transfer_notes: string | null
  inventory_transfer_create_user_id: number
  inventory_transfer_create_date: Generated<Date>
  inventory_transfer_update_date: Generated<Date>
  inventory_transfer_expected_arrival_date: string | null
}

export interface InventoryTransferItems {
  inventory_transfer_item_id: Generated<number>
  inventory_transfer_item_transfer_id: number
  inventory_transfer_item_product_variant_id: number
  inventory_transfer_item_lot_id: number | null
  inventory_transfer_item_quantity: number
  inventory_transfer_item_create_date: Generated<Date>
  inventory_transfer_item_update_date: Generated<Date>
}

export interface ProductionRuns {
  production_run_id: Generated<number>
  production_run_name: string | null
  production_run_company_id: number
  production_run_location_id: number
  production_run_start_date: string | null
  production_run_end_date: string | null
  production_run_status: string
  production_run_notes: string | null
  production_run_create_user_id: number
  production_run_create_date: Generated<Date>
  production_run_update_date: Generated<Date>
}

export interface ProductionRunInputItems {
  production_run_input_item_id: Generated<number>
  production_run_input_item_production_run_id: number
  production_run_input_item_product_variant_id: number
  production_run_input_item_lot_id: number | null
  production_run_input_item_quantity: number
  production_run_input_item_create_date: Generated<Date>
  production_run_input_item_update_date: Generated<Date>
}

export interface ProductionRunOutputItems {
  production_run_output_item_id: Generated<number>
  production_run_output_item_production_run_id: number
  production_run_output_item_product_variant_id: number
  production_run_output_item_lot_id: number | null
  production_run_output_item_quantity: number
  production_run_output_item_create_date: Generated<Date>
  production_run_output_item_update_date: Generated<Date>
}

export interface ActivityLogs {
  activity_log_id: Generated<number>
  activity_log_company_id: number
  activity_log_user_id: number
  activity_log_user_full_name: string | null
  activity_log_user_email: string | null
  activity_log_action: string
  activity_log_type: string
  activity_log_title: string
  activity_log_description: string
  activity_log_data: JSONColumnType<any>
  activity_log_create_date: Generated<Date>
}

export interface IntegrationsLisa {
  integrations_lisa_company_id: number
  integrations_lisa_database_host: string
  integrations_lisa_database_username: string
  integrations_lisa_database_password: string
  integrations_lisa_database_name: string
  integrations_lisa_create_date: Generated<Date>
}
