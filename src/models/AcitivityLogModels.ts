import { z } from "zod"

export const ActivityLogType = z.enum([
  "user",
  "product",
  "inventory",
  "inventory_transfer",
  "production_run",
  "sales_order",
  "purchase_order",
  "settings"
])

export type ActivityLogType = z.infer<typeof ActivityLogType>

export const ActivityLogAction = z.enum(["create", "update", "delete"])

export type ActivityLogAction = z.infer<typeof ActivityLogAction>

export const ActivityLogSchema = z.object({
  activityLogId: z.number(),
  companyId: z.number(),
  userId: z.number(),
  userFullName: z.string().nullable(),
  userEmail: z.string().nullable(),
  action: ActivityLogAction,
  type: ActivityLogType,
  title: z.string(),
  description: z.string(),
  data: z.record(z.string(), z.any()),
  createDate: z.string()
})

export type ActivityLog = z.infer<typeof ActivityLogSchema>

export const CreateActivityLog = ActivityLogSchema.omit({ activityLogId: true, createDate: true })

export type CreateActivityLog = z.infer<typeof CreateActivityLog>
