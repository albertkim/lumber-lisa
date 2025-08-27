import { SecurityRoleService } from "@/server/services/SecurityRoleService"
import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

export const getSecurityRoles = createServerFn({ method: "POST" })
  .validator(
    z.object({
      companyId: z.number()
    })
  )
  .handler(async ({ data }) => {
    const securityRoles = await SecurityRoleService.getSecurityRoles(data.companyId)
    return { data: securityRoles }
  })
