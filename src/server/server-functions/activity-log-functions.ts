import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { ActivityLogService } from "../services/ActivityLogService"
import { authMiddleware } from "./middleware/auth-middleware"
import { userBelongsToCompanyMiddleware } from "./middleware/belongs-to-company-middleware"

export const getActivityLogs = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .inputValidator(z.object({ companyId: z.number() }))
  .handler(async ({ data }) => {
    const activityLogs = await ActivityLogService.getActivityLogsByCompanyId(data.companyId)
    return { data: activityLogs }
  })
