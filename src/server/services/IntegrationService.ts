import {
  Company,
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
  dateFrom?: string
  dateTo?: string
}

const DEFAULT_PRODUCTION_RUN_LIMIT = 50
const MAX_PRODUCTION_RUN_LIMIT = 200

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

    const whereClauses: string[] = []
    if (options?.dateFrom) {
      whereClauses.push(`rh.[Date] >= '${toMssqlDateLiteral(options.dateFrom)}'`)
    }
    if (options?.dateTo) {
      whereClauses.push(`rh.[Date] <= '${toMssqlDateLiteral(options.dateTo)}'`)
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : ""

    const runQuery = `
      SELECT TOP ${limit}
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
      ORDER BY rh.[Date] DESC, rh.Created_Date DESC, rh.ID DESC;
    `

    const runRows = await executeMSSQLQuery(connectionConfig, runQuery)

    if (runRows.length === 0) {
      return { data: [] }
    }

    const runIds = Array.from(new Set(runRows.map((row) => String(row["Run ID"])).filter(Boolean)))

    const escapedRunIds = runIds.map((runId) => `'${runId.replace(/'/g, "''")}'`).join(", ")

    const tagFlowQuery = `
      SELECT
        t.Source AS [Source Run ID],
        t.Dest AS [Destination Run ID],
        t.Prodid AS [Product ID],
        p.Descrip AS [Product Description],
        t.Pcs AS [Pieces],
        t.Fbm AS [FBM],
        t.M3 AS [M3],
        t.Tagid AS [Tag ID]
      FROM dbo.Tag t
      LEFT JOIN dbo.Product p ON p.Prodid = t.Prodid
      WHERE t.Source IN (${escapedRunIds}) OR t.Dest IN (${escapedRunIds});
    `

    const flowRows = await executeMSSQLQuery(connectionConfig, tagFlowQuery)

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
          productId: string
          productDescription: string | null
          inputPieces: number
          inputFBM: number
          inputM3: number
          outputPieces: number
          outputFBM: number
          outputM3: number
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
            productId,
            productDescription: toNullableString(flowRow["Product Description"]),
            inputPieces: 0,
            inputFBM: 0,
            inputM3: 0,
            outputPieces: 0,
            outputFBM: 0,
            outputM3: 0
          })
        }

        const product = productsMap.get(productId)!

        if (flowRow["Destination Run ID"] === runId) {
          inputPieces += pieces
          inputFBM += fbm
          inputM3 += m3
          product.inputPieces += pieces
          product.inputFBM += fbm
          product.inputM3 += m3
          if (tagId) inputTags.add(tagId)
        }

        if (flowRow["Source Run ID"] === runId) {
          outputPieces += pieces
          outputFBM += fbm
          outputM3 += m3
          product.outputPieces += pieces
          product.outputFBM += fbm
          product.outputM3 += m3
          if (tagId) outputTags.add(tagId)
        }
      }

      const products = Array.from(productsMap.values())
        .map((product) => ({
          ...product,
          deltaPieces: product.outputPieces - product.inputPieces,
          deltaFBM: product.outputFBM - product.inputFBM,
          deltaM3: product.outputM3 - product.inputM3
        }))
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

    return { data: runs }
  }
}
