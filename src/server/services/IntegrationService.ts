import {
  Company,
  LisaDeliverySlipReport,
  Integrations,
  LisaCurrentInventoryReport,
  LisaInventoryQuantityReport,
  LisaProductionRunReport,
  UpdateIntegrations
} from "@/models"
import { IntegrationsRepository } from "@/server/repositories/IntegrationsRepository"
import { executeMSSQLQuery, MSSQLConnectionConfig } from "@/server/utilities/MSSQLUtlities"

const LISA_TEST_QUERY = `select 1+1`

const LISA_INVOICE_QUANTITY_LEFT_QUERY = `
  with InvoicedQty as (
      select
          Invoice_Hdr.Orderno,
          Invoice_Det.Prodid,
          sum(Invoice_Det.Qty) as Invoiced
      from Invoice_Det
      join Invoice_Hdr on Invoice_Hdr.ID = Invoice_Det.ID
      join Order_Hdr on Order_Hdr.ID = Invoice_Hdr.Orderno
      where Order_Hdr.Status = 'O'
      group by Invoice_Hdr.Orderno, Invoice_Det.Prodid
  ),

  OrderFirstDescription as (
    select 
      Order_Det.ID as OrderID,
      Order_Det.Descrip,
      row_number() over (partition by Order_Det.ID order by Order_Det.Linenum) as row_number
    from Order_Det
    where Order_Det.Prodid is null
  )

  select
      coalesce(Order_Det.ID, InvoicedQty.Orderno) as [Order ID],
      Order_Hdr.Custord as [Customer Order ID],
      OrderFirstDescription.Descrip as [Order First Description],
      Customer.Name as [Customer Name],
      coalesce(Order_Det.Prodid, InvoicedQty.Prodid) as [Product ID],
      Product.Descrip as [Product Description],
      Order_Hdr.Status as [Order Status],
      Order_Det.Qty as [Order Volume],
      Order_Det.Price as [Order Price Per],
      Order_Det.Unit as [Order Unit],
      InvoicedQty.Invoiced,
      case 
          when Order_Det.Qty is null then null
          else ROUND(Order_Det.Qty - isnull(InvoicedQty.Invoiced, 0), 3)
      end as [Remaining]
  from Order_Det
  full outer join InvoicedQty
      on Order_Det.ID = InvoicedQty.Orderno and Order_Det.Prodid = InvoicedQty.Prodid
  left join Order_Hdr on Order_Hdr.ID = coalesce(Order_Det.ID, InvoicedQty.Orderno)
  left join Customer on Customer.Custid = Order_Hdr.Soldto
  left join Product on Product.Prodid = coalesce(Order_Det.Prodid, InvoicedQty.Prodid)
  left join OrderFirstDescription 
    on OrderFirstDescription.OrderID = coalesce(Order_Det.ID, InvoicedQty.Orderno)
    and OrderFirstDescription.row_number = 1
  where coalesce(Order_Hdr.Status, 'O') = 'O'
    and coalesce(Order_Det.Prodid, InvoicedQty.Prodid) is not null
  order by [Order ID];
`

const LISA_CURRENT_INVENTORY_QUERY = `
  SELECT
    p.Prodid AS [Product ID],
    p.Descrip AS [Product Description],
    p.Species AS [Product Species],
    p.Grade AS [Product Grade],
    p.Thick AS [Product Thickness],
    p.Width AS [Product Width],
    t.Locid AS [Location ID],
    ig.Name AS [Inventory Group Name],
    t.Grpid AS [Inventory Group ID],
    SUM(ISNULL(t.Pcs, 0)) AS [Total Pieces],
    SUM(ISNULL(t.Fbm, 0)) AS [Total FBM],
    SUM(ISNULL(t.M3, 0)) AS [Total M3],
    COUNT(DISTINCT t.Tagid) AS [Number of Tags]
  FROM
    dbo.Tag t
  JOIN
    dbo.Product p ON t.Prodid = p.Prodid
  LEFT JOIN -- Use LEFT JOIN in case Invgrp doesn't have a matching Grpid, though it should
    dbo.Invgrp ig ON t.Grpid = ig.Grpid
  WHERE
      t.Status = 'I' -- ### Filter for "Available" inventory based on our hypothesis ###
  GROUP BY
    p.Prodid,
    p.Descrip,
    p.Species,
    p.Grade,
    p.Thick,
    p.Width,
    t.Locid,
    ig.Name,
    t.Grpid
  HAVING
    SUM(ISNULL(t.Pcs, 0)) > 0 -- Optional: Only show products with some available pieces
  ORDER BY
    p.Descrip,
    t.Locid,
    t.Grpid;
`

type ProductionRunOptions = {
  limit?: number
  offset?: number
  runId?: string
  productQuery?: string
  dateFrom?: string
  dateTo?: string
}

type DeliverySlipOptions = {
  limit?: number
  offset?: number
  searchQuery?: string
  productQuery?: string
  dateFrom?: string
  dateTo?: string
}

const DEFAULT_PRODUCTION_RUN_LIMIT = 25
const MAX_PRODUCTION_RUN_LIMIT = 200
const DEFAULT_DELIVERY_SLIP_LIMIT = 25
const MAX_DELIVERY_SLIP_LIMIT = 300

function toMssqlDateLiteral(value: string): string {
  return value.replace(/'/g, "''")
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0
  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

function toNullableString(value: unknown): string | null {
  if (value === null || value === undefined) return null
  const stringValue = String(value)
  return stringValue.length > 0 ? stringValue : null
}

function toNullableIsoString(value: unknown): string | null {
  if (!value) return null
  if (value instanceof Date) return value.toISOString()
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

function roundTo2(value: number): number {
  return Math.round(value * 100) / 100
}

export const IntegrationService = {
  async getIntegrations(companyId: number): Promise<Integrations> {
    return IntegrationsRepository.getIntegrations(companyId)
  },

  async updateIntegrations(companyId: number, integrations: UpdateIntegrations): Promise<Integrations> {
    if (integrations.lisa) {
      const connectionConfig: MSSQLConnectionConfig = {
        username: integrations.lisa.databaseUsername,
        password: integrations.lisa.databasePassword,
        database: integrations.lisa.databaseName,
        host: integrations.lisa.databaseHost,
        port: 1433
      }
      try {
        const result = await executeMSSQLQuery(connectionConfig, LISA_TEST_QUERY)
        if (result.length === 0) {
          throw Error("Failed to connect to Lisa database")
        }
      } catch (error) {
        throw Error("Failed to connect to Lisa database")
      }
    }
    return IntegrationsRepository.updateIntegrations(companyId, integrations)
  },

  async runLisaInventoryQuantityQuery(company: Company): Promise<LisaInventoryQuantityReport> {
    const integrations = await this.getIntegrations(company.companyId)
    if (!integrations.lisa) {
      throw new Error("Lisa is not configured")
    }

    const connectionConfig: MSSQLConnectionConfig = {
      username: integrations.lisa.databaseUsername,
      password: integrations.lisa.databasePassword,
      database: integrations.lisa.databaseName,
      host: integrations.lisa.databaseHost,
      port: 1433
    }

    const result = await executeMSSQLQuery(connectionConfig, LISA_INVOICE_QUANTITY_LEFT_QUERY)

    return {
      data: result
    } as LisaInventoryQuantityReport
  },

  async runLisaCurrentInventoryQuery(company: Company): Promise<LisaCurrentInventoryReport> {
    const integrations = await this.getIntegrations(company.companyId)
    if (!integrations.lisa) {
      throw new Error("Lisa is not configured")
    }

    const connectionConfig: MSSQLConnectionConfig = {
      username: integrations.lisa.databaseUsername,
      password: integrations.lisa.databasePassword,
      database: integrations.lisa.databaseName,
      host: integrations.lisa.databaseHost,
      port: 1433
    }

    const result = await executeMSSQLQuery(connectionConfig, LISA_CURRENT_INVENTORY_QUERY)

    return {
      data: result
    } as LisaCurrentInventoryReport
  },

  async runLisaProductionRunQuery(company: Company, options?: ProductionRunOptions): Promise<LisaProductionRunReport> {
    const integrations = await this.getIntegrations(company.companyId)
    if (!integrations.lisa) {
      throw new Error("Lisa is not configured")
    }

    const connectionConfig: MSSQLConnectionConfig = {
      username: integrations.lisa.databaseUsername,
      password: integrations.lisa.databasePassword,
      database: integrations.lisa.databaseName,
      host: integrations.lisa.databaseHost,
      port: 1433
    }

    const limit = Math.min(
      MAX_PRODUCTION_RUN_LIMIT,
      Math.max(1, Math.floor(options?.limit ?? DEFAULT_PRODUCTION_RUN_LIMIT))
    )
    const offset = Math.max(0, Math.floor(options?.offset ?? 0))

    const whereClauses: string[] = []
    if (options?.dateFrom) {
      whereClauses.push(`rh.[Date] >= '${toMssqlDateLiteral(options.dateFrom)}'`)
    }
    if (options?.dateTo) {
      whereClauses.push(`rh.[Date] <= '${toMssqlDateLiteral(options.dateTo)}'`)
    }
    if (options?.runId?.trim()) {
      const runIdSearch = toMssqlDateLiteral(options.runId.trim())
      whereClauses.push(`rh.ID LIKE '%${runIdSearch}%'`)
    }
    if (options?.productQuery?.trim()) {
      const productSearch = toMssqlDateLiteral(options.productQuery.trim())
      const productRunIdQuery = `
        SELECT DISTINCT t.Source AS [Run ID]
        FROM dbo.Tag t
        LEFT JOIN dbo.Product p ON p.Prodid = t.Prodid
        WHERE t.Source IS NOT NULL
          AND (
            t.Prodid LIKE '%${productSearch}%'
            OR p.Descrip LIKE '%${productSearch}%'
          )
        UNION
        SELECT DISTINCT t.Dest AS [Run ID]
        FROM dbo.Tag t
        LEFT JOIN dbo.Product p ON p.Prodid = t.Prodid
        WHERE t.Dest IS NOT NULL
          AND (
            t.Prodid LIKE '%${productSearch}%'
            OR p.Descrip LIKE '%${productSearch}%'
          );
      `

      const productRunIdRows = await executeMSSQLQuery(connectionConfig, productRunIdQuery)
      const productRunIds = Array.from(
        new Set(
          productRunIdRows
            .map((row) => toNullableString(row["Run ID"]))
            .filter((value): value is string => Boolean(value))
        )
      )

      if (productRunIds.length === 0) {
        return { data: [], total: 0, offset, limit, page: 1, pageCount: 0 }
      }

      const escapedProductRunIds = productRunIds.map((runId) => `'${runId.replace(/'/g, "''")}'`).join(", ")
      whereClauses.push(`rh.ID IN (${escapedProductRunIds})`)
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : ""

    const totalCountQuery = `
      SELECT COUNT(*) AS [Total Count]
      FROM dbo.Runhdr rh
      ${whereSql};
    `

    const totalCountResult = await executeMSSQLQuery(connectionConfig, totalCountQuery)
    const total = totalCountResult.length > 0 ? toNumber(totalCountResult[0]["Total Count"]) : 0

    const runQuery = `
      SELECT
          rh.ID AS [Run ID],
          rh.[Date] AS [Run Date],
          rh.[Status] AS [Run Status],
          rh.Machineid AS [Machine ID],
          rh.Profile AS [Profile ID],
          rh.WorkOrderId AS [Work Order ID],
          rh.Supplier AS [Supplier ID],
          rh.Invgrp AS [Inventory Group ID]
      FROM dbo.Runhdr rh
      ${whereSql}
      ORDER BY rh.[Date] DESC, rh.Created_Date DESC, rh.ID DESC
      OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
    `

    const runRows = await executeMSSQLQuery(connectionConfig, runQuery)

    if (runRows.length === 0) {
      const page = total === 0 ? 1 : Math.floor(offset / limit) + 1
      const pageCount = total === 0 ? 0 : Math.ceil(total / limit)
      return { data: [], total, offset, limit, page, pageCount }
    }

    const runIds = Array.from(new Set(runRows.map((row) => String(row["Run ID"])).filter(Boolean)))

    const escapedRunIds = runIds.map((runId) => `'${runId.replace(/'/g, "''")}'`).join(", ")

    const tagFlowQuery = `
      SELECT
        t.Tagid AS [Tag ID],
        t.[Status] AS [Tag Status],
        t.Source AS [Source Run ID],
        t.Dest AS [Destination Run ID],
        t.Sourcedate AS [Source Date],
        t.Destdate AS [Destination Date],
        t.Locid AS [Location ID],
        t.Grpid AS [Inventory Group ID],
        t.Prodid AS [Product ID],
        p.Descrip AS [Product Description],
        t.Pcs AS [Pieces],
        t.Fbm AS [FBM],
        t.M3 AS [M3]
      FROM dbo.Tag t
      LEFT JOIN dbo.Product p ON p.Prodid = t.Prodid
      WHERE t.Source IN (${escapedRunIds}) OR t.Dest IN (${escapedRunIds});
    `

    const flowRows = await executeMSSQLQuery(connectionConfig, tagFlowQuery)

    const outputTagDeliveryQuery = `
      SELECT
        t.Source AS [Run ID],
        t.Prodid AS [Product ID],
        t.Tagid AS [Tag ID],
        t.Dest AS [Delivery Slip ID],
        t.Pcs AS [Pieces],
        t.Fbm AS [FBM],
        t.M3 AS [M3],
        d.[Date] AS [Delivery Date],
        idl.Invoice AS [Invoice ID]
      FROM dbo.Tag t
      INNER JOIN dbo.Delslip d ON d.Dsid = t.Dest
      INNER JOIN dbo.Invoice_Delslip idl ON idl.Delslip = d.Dsid
      WHERE t.Source IN (${escapedRunIds})
        AND t.Prodid IS NOT NULL;
    `

    const outputTagDeliveryRows = await executeMSSQLQuery(connectionConfig, outputTagDeliveryQuery)

    const deliveryIds = Array.from(
      new Set(outputTagDeliveryRows.map((row) => toNullableString(row["Delivery Slip ID"])).filter((value): value is string => !!value))
    )

    const invoicePriceByDeliveryAndProduct = new Map<string, number>()
    if (deliveryIds.length > 0) {
      const escapedDeliveryIds = deliveryIds.map((deliveryId) => `'${deliveryId.replace(/'/g, "''")}'`).join(", ")
      const invoicePriceByDeliveryAndProductQuery = `
        SELECT
          idl.Delslip AS [Delivery Slip ID],
          idet.Prodid AS [Product ID],
          ROUND(
            CASE
              WHEN SUM(ISNULL(idet.Qty, 0)) = 0 THEN AVG(CAST(idet.Price AS float))
              ELSE SUM(CAST(idet.Price AS float) * ISNULL(idet.Qty, 0)) / NULLIF(SUM(ISNULL(idet.Qty, 0)), 0)
            END
          , 2) AS [Average Invoice Price Per 1000 FBM]
        FROM dbo.Invoice_Delslip idl
        INNER JOIN dbo.Invoice_Det idet ON idet.ID = idl.Invoice
        WHERE idl.Delslip IN (${escapedDeliveryIds})
          AND idet.Prodid IS NOT NULL
        GROUP BY idl.Delslip, idet.Prodid;
      `
      const invoicePriceRows = await executeMSSQLQuery(connectionConfig, invoicePriceByDeliveryAndProductQuery)
      for (const row of invoicePriceRows) {
        const deliverySlipId = toNullableString(row["Delivery Slip ID"])
        const productId = toNullableString(row["Product ID"])
        if (!deliverySlipId || !productId) continue
        invoicePriceByDeliveryAndProduct.set(
          `${deliverySlipId}::${productId}`,
          toNumber(row["Average Invoice Price Per 1000 FBM"])
        )
      }
    }

    const runs = runRows.map((runRow) => {
      const runId = String(runRow["Run ID"])
      const runFlowRows = flowRows.filter((flowRow) => flowRow["Source Run ID"] === runId || flowRow["Destination Run ID"] === runId)

      let inputPieces = 0
      let inputFBM = 0
      let inputM3 = 0
      let outputPieces = 0
      let outputFBM = 0
      let outputM3 = 0

      const inputTags = new Set<string>()
      const outputTags = new Set<string>()

      const productsMap = new Map<
        string,
        {
          inputTagCount: number
          outputTagCount: number
          productId: string
          productDescription: string | null
          inputPieces: number
          inputFBM: number
          inputM3: number
          outputPieces: number
          outputFBM: number
          outputM3: number
          deliveries: Array<{
            deliverySlipId: string
            deliveryDate: string | null
            invoiceIds: string[]
            invoicePricePer1000FBM: number | null
            tagCount: number
            pieces: number
            fbm: number
            m3: number
          }>
          tags: Array<{
            tagId: string
            flow: "input" | "output"
            status: string | null
            sourceRunId: string | null
            destinationRunId: string | null
            locationId: string | null
            inventoryGroupId: string | null
            pieces: number
            fbm: number
            m3: number
            sourceDate: string | null
            destinationDate: string | null
          }>
        }
      >()

      for (const flowRow of runFlowRows) {
        const productId = toNullableString(flowRow["Product ID"])
        if (!productId) continue

        const pieces = toNumber(flowRow["Pieces"])
        const fbm = toNumber(flowRow["FBM"])
        const m3 = toNumber(flowRow["M3"])
        const tagId = toNullableString(flowRow["Tag ID"])

        if (!productsMap.has(productId)) {
          productsMap.set(productId, {
            inputTagCount: 0,
            outputTagCount: 0,
            productId,
            productDescription: toNullableString(flowRow["Product Description"]),
            inputPieces: 0,
            inputFBM: 0,
            inputM3: 0,
            outputPieces: 0,
            outputFBM: 0,
            outputM3: 0,
            deliveries: [],
            tags: []
          })
        }

        const product = productsMap.get(productId)!

        if (flowRow["Destination Run ID"] === runId) {
          inputPieces += pieces
          inputFBM += fbm
          inputM3 += m3
          product.inputTagCount += 1
          product.inputPieces += pieces
          product.inputFBM += fbm
          product.inputM3 += m3
          if (tagId) {
            product.tags.push({
              tagId,
              flow: "input",
              status: toNullableString(flowRow["Tag Status"]),
              sourceRunId: toNullableString(flowRow["Source Run ID"]),
              destinationRunId: toNullableString(flowRow["Destination Run ID"]),
              locationId: toNullableString(flowRow["Location ID"]),
              inventoryGroupId: toNullableString(flowRow["Inventory Group ID"]),
              pieces,
              fbm,
              m3,
              sourceDate: toNullableIsoString(flowRow["Source Date"]),
              destinationDate: toNullableIsoString(flowRow["Destination Date"])
            })
          }
          if (tagId) inputTags.add(tagId)
        }

        if (flowRow["Source Run ID"] === runId) {
          outputPieces += pieces
          outputFBM += fbm
          outputM3 += m3
          product.outputTagCount += 1
          product.outputPieces += pieces
          product.outputFBM += fbm
          product.outputM3 += m3
          if (tagId) {
            product.tags.push({
              tagId,
              flow: "output",
              status: toNullableString(flowRow["Tag Status"]),
              sourceRunId: toNullableString(flowRow["Source Run ID"]),
              destinationRunId: toNullableString(flowRow["Destination Run ID"]),
              locationId: toNullableString(flowRow["Location ID"]),
              inventoryGroupId: toNullableString(flowRow["Inventory Group ID"]),
              pieces,
              fbm,
              m3,
              sourceDate: toNullableIsoString(flowRow["Source Date"]),
              destinationDate: toNullableIsoString(flowRow["Destination Date"])
            })
          }
          if (tagId) outputTags.add(tagId)
        }
      }

      const products = Array.from(productsMap.values())
        .map((product) => {
          const deliveryMap = new Map<
            string,
            {
              deliverySlipId: string
              deliveryDate: string | null
              invoiceIds: Set<string>
              invoicePricePer1000FBM: number | null
              tagIds: Set<string>
              pieces: number
              fbm: number
              m3: number
            }
          >()

          const productDeliveryRows = outputTagDeliveryRows.filter(
            (row) => row["Run ID"] === runId && row["Product ID"] === product.productId
          )

          for (const row of productDeliveryRows) {
            const deliverySlipId = toNullableString(row["Delivery Slip ID"])
            const invoiceId = toNullableString(row["Invoice ID"])
            const tagId = toNullableString(row["Tag ID"])
            if (!deliverySlipId || !tagId) continue

            if (!deliveryMap.has(deliverySlipId)) {
              deliveryMap.set(deliverySlipId, {
                deliverySlipId,
                deliveryDate: toNullableIsoString(row["Delivery Date"]),
                invoiceIds: new Set<string>(),
                invoicePricePer1000FBM:
                  invoicePriceByDeliveryAndProduct.get(`${deliverySlipId}::${product.productId}`) ?? null,
                tagIds: new Set<string>(),
                pieces: 0,
                fbm: 0,
                m3: 0
              })
            }

            const delivery = deliveryMap.get(deliverySlipId)!
            if (invoiceId) delivery.invoiceIds.add(invoiceId)
            if (delivery.tagIds.has(tagId)) continue
            delivery.tagIds.add(tagId)
            delivery.pieces += toNumber(row["Pieces"])
            delivery.fbm += toNumber(row["FBM"])
            delivery.m3 += toNumber(row["M3"])
          }

          const deliveries = Array.from(deliveryMap.values())
            .map((delivery) => ({
              deliverySlipId: delivery.deliverySlipId,
              deliveryDate: delivery.deliveryDate,
              invoiceIds: Array.from(delivery.invoiceIds),
              invoicePricePer1000FBM: delivery.invoicePricePer1000FBM,
              tagCount: delivery.tagIds.size,
              pieces: roundTo2(delivery.pieces),
              fbm: roundTo2(delivery.fbm),
              m3: roundTo2(delivery.m3)
            }))
            .sort((a, b) => b.fbm - a.fbm)

          return {
            ...product,
            deliveries,
            deltaPieces: roundTo2(product.outputPieces - product.inputPieces),
            deltaFBM: roundTo2(product.outputFBM - product.inputFBM),
            deltaM3: roundTo2(product.outputM3 - product.inputM3)
          }
        })
        .sort((a, b) => Math.abs(b.deltaFBM) - Math.abs(a.deltaFBM))

      return {
        runId,
        runDate: toNullableIsoString(runRow["Run Date"]),
        runStatus: toNullableString(runRow["Run Status"]),
        machineId: toNullableString(runRow["Machine ID"]),
        profileId: toNullableString(runRow["Profile ID"]),
        workOrderId: toNullableString(runRow["Work Order ID"]),
        supplierId: toNullableString(runRow["Supplier ID"]),
        inventoryGroupId: toNullableString(runRow["Inventory Group ID"]),
        inputTagCount: inputTags.size,
        outputTagCount: outputTags.size,
        inputPieces,
        inputFBM,
        inputM3,
        outputPieces,
        outputFBM,
        outputM3,
        deltaPieces: outputPieces - inputPieces,
        deltaFBM: outputFBM - inputFBM,
        deltaM3: outputM3 - inputM3,
        products
      }
    })

    const page = total === 0 ? 1 : Math.floor(offset / limit) + 1
    const pageCount = total === 0 ? 0 : Math.ceil(total / limit)

    return { data: runs, total, offset, limit, page, pageCount }
  },

  async runLisaDeliverySlipQuery(company: Company, options?: DeliverySlipOptions): Promise<LisaDeliverySlipReport> {
    const integrations = await this.getIntegrations(company.companyId)
    if (!integrations.lisa) {
      throw new Error("Lisa is not configured")
    }

    const connectionConfig: MSSQLConnectionConfig = {
      username: integrations.lisa.databaseUsername,
      password: integrations.lisa.databasePassword,
      database: integrations.lisa.databaseName,
      host: integrations.lisa.databaseHost,
      port: 1433
    }

    const limit = Math.min(MAX_DELIVERY_SLIP_LIMIT, Math.max(1, Math.floor(options?.limit ?? DEFAULT_DELIVERY_SLIP_LIMIT)))
    const offset = Math.max(0, Math.floor(options?.offset ?? 0))

    const whereClauses: string[] = []
    if (options?.dateFrom) {
      whereClauses.push(`d.[Date] >= '${toMssqlDateLiteral(options.dateFrom)}'`)
    }
    if (options?.dateTo) {
      whereClauses.push(`d.[Date] <= '${toMssqlDateLiteral(options.dateTo)}'`)
    }
    if (options?.searchQuery?.trim()) {
      const search = toMssqlDateLiteral(options.searchQuery.trim())
      whereClauses.push(`
        (
          d.Dsid LIKE '%${search}%'
          OR d.Custid LIKE '%${search}%'
          OR d.Custord LIKE '%${search}%'
          OR EXISTS (
            SELECT 1
            FROM dbo.Delslip_Order do_filter
            WHERE do_filter.Delslip = d.Dsid
              AND do_filter.Orderno LIKE '%${search}%'
          )
          OR EXISTS (
            SELECT 1
            FROM dbo.Invoice_Delslip idl_filter
            WHERE idl_filter.Delslip = d.Dsid
              AND idl_filter.Invoice LIKE '%${search}%'
          )
        )
      `)
    }
    if (options?.productQuery?.trim()) {
      const productSearch = toMssqlDateLiteral(options.productQuery.trim())
      whereClauses.push(`
        EXISTS (
          SELECT 1
          FROM dbo.Tag t_filter
          LEFT JOIN dbo.Product p_filter ON p_filter.Prodid = t_filter.Prodid
          WHERE t_filter.Dest = d.Dsid
            AND (
              t_filter.Prodid LIKE '%${productSearch}%'
              OR p_filter.Descrip LIKE '%${productSearch}%'
            )
        )
      `)
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : ""

    const totalCountQuery = `
      SELECT COUNT(*) AS [Total Count]
      FROM dbo.Delslip d
      ${whereSql};
    `

    const totalCountResult = await executeMSSQLQuery(connectionConfig, totalCountQuery)
    const total = totalCountResult.length > 0 ? toNumber(totalCountResult[0]["Total Count"]) : 0

    const deliveryQuery = `
      SELECT
        d.Dsid AS [Delivery Slip ID],
        d.[Date] AS [Delivery Date],
        d.Custid AS [Customer ID],
        d.Custord AS [Customer Order ID],
        d.Invgrp AS [Inventory Group ID],
        d.ShipMode AS [Ship Mode],
        d.Carrier AS [Carrier],
        d.Truckno AS [Truck Number],
        d.Posted AS [Posted]
      FROM dbo.Delslip d
      ${whereSql}
      ORDER BY d.[Date] DESC, d.Dsid DESC
      OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
    `

    const deliveryRows = await executeMSSQLQuery(connectionConfig, deliveryQuery)
    if (deliveryRows.length === 0) {
      const page = total === 0 ? 1 : Math.floor(offset / limit) + 1
      const pageCount = total === 0 ? 0 : Math.ceil(total / limit)
      return { data: [], total, offset, limit, page, pageCount }
    }

    const deliveryIds = Array.from(new Set(deliveryRows.map((row) => String(row["Delivery Slip ID"])).filter(Boolean)))
    const escapedDeliveryIds = deliveryIds.map((id) => `'${id.replace(/'/g, "''")}'`).join(", ")

    const tagsQuery = `
      SELECT
        t.Dest AS [Delivery Slip ID],
        t.Tagid AS [Tag ID],
        t.Prodid AS [Product ID],
        p.Descrip AS [Product Description],
        t.[Status] AS [Tag Status],
        t.Source AS [Source],
        t.Dest AS [Destination],
        t.Sourcedate AS [Source Date],
        t.Destdate AS [Destination Date],
        t.Pcs AS [Pieces],
        t.Fbm AS [FBM],
        t.M3 AS [M3]
      FROM dbo.Tag t
      LEFT JOIN dbo.Product p ON p.Prodid = t.Prodid
      WHERE t.Dest IN (${escapedDeliveryIds});
    `

    const linkedOrdersQuery = `
      SELECT
        do.Delslip AS [Delivery Slip ID],
        do.Orderno AS [Order ID]
      FROM dbo.Delslip_Order do
      WHERE do.Delslip IN (${escapedDeliveryIds});
    `

    const linkedInvoicesQuery = `
      SELECT
        idl.Delslip AS [Delivery Slip ID],
        idl.Invoice AS [Invoice ID]
      FROM dbo.Invoice_Delslip idl
      WHERE idl.Delslip IN (${escapedDeliveryIds});
    `

    const invoicePriceByProductQuery = `
      SELECT
        idl.Delslip AS [Delivery Slip ID],
        idet.Prodid AS [Product ID],
        ROUND(
        CASE
          WHEN SUM(ISNULL(idet.Qty, 0)) = 0 THEN AVG(CAST(idet.Price AS float))
          ELSE SUM(CAST(idet.Price AS float) * ISNULL(idet.Qty, 0)) / NULLIF(SUM(ISNULL(idet.Qty, 0)), 0)
        END
        , 2) AS [Average Invoice Price Per 1000 FBM]
      FROM dbo.Invoice_Delslip idl
      INNER JOIN dbo.Invoice_Det idet ON idet.ID = idl.Invoice
      WHERE idl.Delslip IN (${escapedDeliveryIds})
        AND idet.Prodid IS NOT NULL
      GROUP BY idl.Delslip, idet.Prodid;
    `

    const [tagRows, linkedOrderRows, linkedInvoiceRows, invoicePriceRows] = await Promise.all([
      executeMSSQLQuery(connectionConfig, tagsQuery),
      executeMSSQLQuery(connectionConfig, linkedOrdersQuery),
      executeMSSQLQuery(connectionConfig, linkedInvoicesQuery),
      executeMSSQLQuery(connectionConfig, invoicePriceByProductQuery)
    ])

    const invoicePriceByDeliveryAndProduct = new Map<string, number>()
    for (const row of invoicePriceRows) {
      const deliverySlipId = toNullableString(row["Delivery Slip ID"])
      const productId = toNullableString(row["Product ID"])
      if (!deliverySlipId || !productId) continue
      invoicePriceByDeliveryAndProduct.set(
        `${deliverySlipId}::${productId}`,
        toNumber(row["Average Invoice Price Per 1000 FBM"])
      )
    }

    const reportRows = deliveryRows.map((delivery) => {
      const deliverySlipId = String(delivery["Delivery Slip ID"])
      const tags = tagRows
        .filter((tag) => tag["Delivery Slip ID"] === deliverySlipId)
        .map((tag) => {
          const productId = toNullableString(tag["Product ID"])
          return {
            tagId: String(tag["Tag ID"]),
            productId,
          productDescription: toNullableString(tag["Product Description"]),
          invoicePricePer1000FBM: productId ? invoicePriceByDeliveryAndProduct.get(`${deliverySlipId}::${productId}`) ?? null : null,
          status: toNullableString(tag["Tag Status"]),
          source: toNullableString(tag["Source"]),
          destination: toNullableString(tag["Destination"]),
          sourceDate: toNullableIsoString(tag["Source Date"]),
          destinationDate: toNullableIsoString(tag["Destination Date"]),
          pieces: toNumber(tag["Pieces"]),
          fbm: toNumber(tag["FBM"]),
          m3: toNumber(tag["M3"])
          }
        })

      const linkedOrderIds = Array.from(
        new Set(
          linkedOrderRows
            .filter((row) => row["Delivery Slip ID"] === deliverySlipId)
            .map((row) => toNullableString(row["Order ID"]))
            .filter((row): row is string => !!row)
        )
      )

      const linkedInvoiceIds = Array.from(
        new Set(
          linkedInvoiceRows
            .filter((row) => row["Delivery Slip ID"] === deliverySlipId)
            .map((row) => toNullableString(row["Invoice ID"]))
            .filter((row): row is string => !!row)
        )
      )

      return {
        deliverySlipId,
        deliveryDate: toNullableIsoString(delivery["Delivery Date"]),
        customerId: toNullableString(delivery["Customer ID"]),
        customerOrderId: toNullableString(delivery["Customer Order ID"]),
        inventoryGroupId: toNullableString(delivery["Inventory Group ID"]),
        shipMode: toNullableString(delivery["Ship Mode"]),
        carrier: toNullableString(delivery["Carrier"]),
        truckNumber: toNullableString(delivery["Truck Number"]),
        posted: toNullableString(delivery["Posted"]),
        linkedOrderIds,
        linkedInvoiceIds,
        tagCount: tags.length,
        totalPieces: tags.reduce((sum, tag) => sum + tag.pieces, 0),
        totalFBM: tags.reduce((sum, tag) => sum + tag.fbm, 0),
        totalM3: tags.reduce((sum, tag) => sum + tag.m3, 0),
        tags
      }
    })

    const page = total === 0 ? 1 : Math.floor(offset / limit) + 1
    const pageCount = total === 0 ? 0 : Math.ceil(total / limit)

    return { data: reportRows, total, offset, limit, page, pageCount }
  }
}
