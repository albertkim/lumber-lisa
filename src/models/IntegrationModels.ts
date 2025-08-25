import { z } from "zod"

export const IntegrationsSchema = z.object({
  lisa: z
    .object({
      databaseHost: z.string(),
      databaseUsername: z.string(),
      databasePassword: z.string(),
      databaseName: z.string()
    })
    .nullable()
})

export type Integrations = z.infer<typeof IntegrationsSchema>

export const UpdateIntegrationsSchema = IntegrationsSchema.partial().extend({
  lisa: z
    .object({
      databaseHost: z.string().min(1),
      databaseUsername: z.string().min(1),
      databasePassword: z.string().min(1),
      databaseName: z.string().min(1)
    })
    .nullable()
})

export type UpdateIntegrations = z.infer<typeof UpdateIntegrationsSchema>

export const LisaReportSchema = z.object({
  data: z.array(
    z.object({
      "Order ID": z.string(),
      "Customer Order ID": z.string().nullable(),
      "Order First Description": z.string().nullable(),
      "Customer Name": z.string().nullable(),
      "Product ID": z.string(),
      "Product Description": z.string().nullable(),
      "Order Status": z.string(),
      "Order Volume": z.number().nullable(),
      "Order Price Per": z.number().nullable(),
      "Order Unit": z.string().nullable(),
      Invoiced: z.number().nullable(),
      Remaining: z.number().nullable()
    })
  )
})

export type LisaReport = z.infer<typeof LisaReportSchema>
