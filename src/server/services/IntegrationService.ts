import { Company, Integrations, LisaReport, UpdateIntegrations } from "@/models"
import { IntegrationsRepository } from "@/server/repositories/IntegrationsRepository"
import { executeMSSQLQuery, MSSQLConnectionConfig } from "@/server/utilities/MSSQLUtlities"
import { createError } from "@tanstack/react-start/server"

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
    p.Prodid,
    p.Descrip AS ProductDescription,
    p.Species AS ProductSpecies,
    p.Grade AS ProductGrade,
    p.Thick AS ProductThickness,
    p.Width AS ProductWidth,
    t.Locid AS LocationId,
    ig.Name AS InventoryGroupName, -- Assuming you want the name from Invgrp
    t.Grpid AS InventoryGroupId,   -- Still including Grpid if needed separately
    SUM(ISNULL(t.Pcs, 0)) AS TotalPieces,
    SUM(ISNULL(t.Fbm, 0)) AS TotalFBM,
    SUM(ISNULL(t.M3, 0)) AS TotalM3,
    COUNT(DISTINCT t.Tagid) AS NumberOfTags -- Number of unique bundles/tags
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
          throw createError({
            status: 400,
            message: "Failed to connect to Lisa database"
          })
        }
      } catch (error) {
        throw createError({
          status: 400,
          message: "Failed to connect to Lisa database"
        })
      }
    }
    return IntegrationsRepository.updateIntegrations(companyId, integrations)
  },

  async runLisaQuery(company: Company): Promise<LisaReport> {
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
    } as LisaReport
  }
}
