import { CreateSecurityRole, SecurityRole, SecurityRoleSchema } from "@/models"
import { db } from "@/server/database"

async function getSecurityRole(
  companyId: number,
  { securityRoleId, securityRoleName }: { securityRoleId?: number; securityRoleName?: string }
): Promise<SecurityRole> {
  let query = db
    .selectFrom("security_roles")
    .leftJoin(
      "security_role_permissions",
      "security_role_permissions.security_role_permission_security_role_id",
      "security_roles.security_role_id"
    )
    .leftJoin(
      "permissions",
      "permissions.permission_id",
      "security_role_permissions.security_role_permission_permission_id"
    )
    .selectAll()

  if (securityRoleId) {
    query.where("security_role_id", "=", securityRoleId)
  }
  if (securityRoleName) {
    query.where("security_role_name", "=", securityRoleName)
  }
  query.where("security_role_company_id", "=", companyId)

  const securityRoleWithPermissionAssignments = await query.execute()

  if (securityRoleWithPermissionAssignments.length === 0) {
    throw Error("Security role not found")
  }

  const permissions = await db.selectFrom("permissions").selectAll().execute()

  const securityRoleWithoutPermissions: SecurityRole = {
    securityRoleId: securityRoleWithPermissionAssignments[0].security_role_id,
    securityRoleName: securityRoleWithPermissionAssignments[0].security_role_name,
    securityRoleCompanyId: securityRoleWithPermissionAssignments[0].security_role_company_id,
    permissions: []
  }

  const securityRoleWithPermissions: SecurityRole = {
    ...securityRoleWithoutPermissions,
    permissions: permissions.map((permission) => ({
      permissionId: permission.permission_id,
      permissionName: permission.permission_name,
      permissionDescription: permission.permission_description,
      permissionEnabled: securityRoleWithPermissionAssignments.some(
        (assignment) => assignment.permission_id === permission.permission_id
      )
    }))
  }

  return SecurityRoleSchema.parse(securityRoleWithPermissions)
}

export const SecurityRoleRepository = {
  async getAllPermissions() {
    return await db.selectFrom("permissions").selectAll().execute()
  },

  async getSecurityRoleById(companyId: number, securityRoleId: number): Promise<SecurityRole> {
    return getSecurityRole(companyId, { securityRoleId })
  },

  async getSecurityRoleByRoleName(companyId: number, securityRoleName: string): Promise<SecurityRole> {
    return getSecurityRole(companyId, { securityRoleName })
  },

  async getSecurityRoles(companyId: number): Promise<SecurityRole[]> {
    const securityRolesWithPermissionAssignments = await db
      .selectFrom("security_roles")
      .leftJoin(
        "security_role_permissions",
        "security_role_permissions.security_role_permission_security_role_id",
        "security_roles.security_role_id"
      )
      .leftJoin(
        "permissions",
        "permissions.permission_id",
        "security_role_permissions.security_role_permission_permission_id"
      )
      .where("security_role_company_id", "=", companyId)
      .selectAll()
      .execute()

    // Group by security role ID to remove duplicates
    const groupedSecurityRoles = securityRolesWithPermissionAssignments.reduce(
      (acc, role) => {
        if (!acc[role.security_role_id]) {
          acc[role.security_role_id] = role
        }
        return acc
      },
      {} as Record<number, (typeof securityRolesWithPermissionAssignments)[0]>
    )

    const permissions = await db.selectFrom("permissions").selectAll().execute()

    // Use Object.values to get the unique security roles
    const securityRolesWithoutPermissions: SecurityRole[] = Object.values(groupedSecurityRoles).map((securityRole) => {
      const securityRoleWithoutPermissions: SecurityRole = {
        securityRoleId: securityRole.security_role_id,
        securityRoleName: securityRole.security_role_name,
        securityRoleCompanyId: securityRole.security_role_company_id,
        permissions: []
      }
      return SecurityRoleSchema.parse(securityRoleWithoutPermissions)
    })

    const securityRolesWithPermissions: SecurityRole[] = securityRolesWithoutPermissions.map((securityRole) => {
      return {
        ...securityRole,
        companyId: companyId,
        permissions: permissions.map((permission) => {
          const hasPermission = securityRolesWithPermissionAssignments.some(
            (assignment) =>
              assignment.security_role_id === securityRole.securityRoleId &&
              assignment.permission_id === permission.permission_id
          )
          return {
            permissionId: permission.permission_id,
            permissionName: permission.permission_name,
            permissionDescription: permission.permission_description,
            permissionEnabled: hasPermission
          }
        })
      }
    })

    return securityRolesWithPermissions
  },

  async createSecurityRole(securityRole: CreateSecurityRole): Promise<SecurityRole> {
    const createSecurityRoleResult = await db
      .insertInto("security_roles")
      .values({
        security_role_name: securityRole.securityRoleName,
        security_role_company_id: securityRole.companyId
      })
      .returningAll()
      .executeTakeFirst()

    if (!createSecurityRoleResult) {
      throw Error("Failed to create security role")
    }

    const createSecurityRolePermissionsResult = await db
      .insertInto("security_role_permissions")
      .values(
        securityRole.permissions
          .filter((permission) => permission.permissionEnabled)
          .map((permission) => ({
            security_role_permission_security_role_id: createSecurityRoleResult.security_role_id,
            security_role_permission_permission_id: permission.permissionId
          }))
      )
      .execute()

    if (!createSecurityRolePermissionsResult) {
      throw Error("Failed to create security role permissions")
    }

    return await this.getSecurityRoleById(securityRole.companyId, createSecurityRoleResult.security_role_id)
  }
}
