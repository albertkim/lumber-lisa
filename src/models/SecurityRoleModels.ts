import { z } from "zod"

export const PermissionSchema = z.object({
  permissionId: z.number(),
  permissionName: z.string(),
  permissionDescription: z.string(),
  permissionEnabled: z.boolean()
})

export const SecurityRoleSchema = z.object({
  securityRoleId: z.number(),
  securityRoleCompanyId: z.number(),
  securityRoleName: z.string(),
  permissions: z.array(PermissionSchema)
})

const CreateSecurityRoleSchema = z.object({
  companyId: z.number(),
  securityRoleName: z.string(),
  permissions: z.array(
    z.object({
      permissionId: z.number(),
      permissionEnabled: z.boolean()
    })
  )
})

export type SecurityRole = z.infer<typeof SecurityRoleSchema>
export type Permission = z.infer<typeof PermissionSchema>
export type CreateSecurityRole = z.infer<typeof CreateSecurityRoleSchema>
