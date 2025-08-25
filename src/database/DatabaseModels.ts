import { Generated, JSONColumnType } from "kysely"

export interface DB {
  users: Users
  auth_tokens: AuthTokens
  reset_password_tokens: ResetPasswordTokens
  companies: Companies
  locations: Locations
  security_roles: SecurityRoles
  permissions: Permissions
  security_role_permissions: SecurityRolePermissions
  user_assignments: UserAssignments
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
