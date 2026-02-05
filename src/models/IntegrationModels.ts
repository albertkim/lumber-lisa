import { z } from "zod"

export const IntegrationsSchema = z.object({
  companyId: z.number(),
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
  companyId: z.number(),
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

export const LisaInventoryQuantityReportSchema = z.object({
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

export type LisaInventoryQuantityReport = z.infer<typeof LisaInventoryQuantityReportSchema>

export const LisaCurrentInventoryReportSchema = z.object({
  data: z.array(
    z.object({
      "Product ID": z.string(),
      "Product Description": z.string().nullable(),
      "Product Species": z.string().nullable(),
      "Product Grade": z.string().nullable(),
      "Product Thickness": z.string().nullable(),
      "Product Width": z.string().nullable(),
      "Location ID": z.string().nullable(),
      "Inventory Group Name": z.string().nullable(),
      "Inventory Group ID": z.string().nullable(),
      "Total Pieces": z.number().nullable(),
      "Total FBM": z.number().nullable(),
      "Total M3": z.number().nullable(),
      "Number of Tags": z.number().nullable()
    })
  )
})

export type LisaCurrentInventoryReport = z.infer<typeof LisaCurrentInventoryReportSchema>

export const LisaProductionRunProductFlowSchema = z.object({
  inputTagCount: z.number(),
  outputTagCount: z.number(),
  productId: z.string(),
  productDescription: z.string().nullable(),
  inputPieces: z.number(),
  inputFBM: z.number(),
  inputM3: z.number(),
  outputPieces: z.number(),
  outputFBM: z.number(),
  outputM3: z.number(),
  deltaPieces: z.number(),
  deltaFBM: z.number(),
  deltaM3: z.number(),
  deliveries: z.array(
    z.object({
      deliverySlipId: z.string(),
      deliveryDate: z.string().nullable(),
      invoiceIds: z.array(z.string()),
      invoicePricePer1000FBM: z.number().nullable(),
      tagCount: z.number(),
      pieces: z.number(),
      fbm: z.number(),
      m3: z.number()
    })
  ),
  tags: z.array(
    z.object({
      tagId: z.string(),
      flow: z.enum(["input", "output"]),
      status: z.string().nullable(),
      sourceRunId: z.string().nullable(),
      destinationRunId: z.string().nullable(),
      locationId: z.string().nullable(),
      inventoryGroupId: z.string().nullable(),
      pieces: z.number(),
      fbm: z.number(),
      m3: z.number(),
      sourceDate: z.string().nullable(),
      destinationDate: z.string().nullable()
    })
  )
})

export type LisaProductionRunProductFlow = z.infer<typeof LisaProductionRunProductFlowSchema>

export const LisaProductionRunSchema = z.object({
  runId: z.string(),
  runDate: z.string().nullable(),
  runStatus: z.string().nullable(),
  machineId: z.string().nullable(),
  profileId: z.string().nullable(),
  workOrderId: z.string().nullable(),
  supplierId: z.string().nullable(),
  inventoryGroupId: z.string().nullable(),
  inputTagCount: z.number(),
  outputTagCount: z.number(),
  inputPieces: z.number(),
  inputFBM: z.number(),
  inputM3: z.number(),
  outputPieces: z.number(),
  outputFBM: z.number(),
  outputM3: z.number(),
  deltaPieces: z.number(),
  deltaFBM: z.number(),
  deltaM3: z.number(),
  products: z.array(LisaProductionRunProductFlowSchema)
})

export type LisaProductionRun = z.infer<typeof LisaProductionRunSchema>

export const LisaProductionRunReportSchema = z.object({
  data: z.array(LisaProductionRunSchema),
  total: z.number(),
  offset: z.number(),
  limit: z.number(),
  page: z.number(),
  pageCount: z.number()
})

export type LisaProductionRunReport = z.infer<typeof LisaProductionRunReportSchema>

export const LisaDeliverySlipTagSchema = z.object({
  tagId: z.string(),
  productId: z.string().nullable(),
  productDescription: z.string().nullable(),
  invoicePricePer1000FBM: z.number().nullable(),
  status: z.string().nullable(),
  source: z.string().nullable(),
  destination: z.string().nullable(),
  sourceDate: z.string().nullable(),
  destinationDate: z.string().nullable(),
  pieces: z.number(),
  fbm: z.number(),
  m3: z.number()
})

export type LisaDeliverySlipTag = z.infer<typeof LisaDeliverySlipTagSchema>

export const LisaDeliverySlipSchema = z.object({
  deliverySlipId: z.string(),
  deliveryDate: z.string().nullable(),
  customerId: z.string().nullable(),
  customerOrderId: z.string().nullable(),
  inventoryGroupId: z.string().nullable(),
  shipMode: z.string().nullable(),
  carrier: z.string().nullable(),
  truckNumber: z.string().nullable(),
  posted: z.string().nullable(),
  linkedOrderIds: z.array(z.string()),
  linkedInvoiceIds: z.array(z.string()),
  tagCount: z.number(),
  totalPieces: z.number(),
  totalFBM: z.number(),
  totalM3: z.number(),
  tags: z.array(LisaDeliverySlipTagSchema)
})

export type LisaDeliverySlip = z.infer<typeof LisaDeliverySlipSchema>

export const LisaDeliverySlipReportSchema = z.object({
  data: z.array(LisaDeliverySlipSchema),
  total: z.number(),
  offset: z.number(),
  limit: z.number(),
  page: z.number(),
  pageCount: z.number()
})

export type LisaDeliverySlipReport = z.infer<typeof LisaDeliverySlipReportSchema>
