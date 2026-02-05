import { Currency } from "@/components/formatting/Currency"
import { Number } from "@/components/formatting/Number"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { LisaDeliverySlipReport } from "@/models"
import { getDeliverySlipReport } from "@/server/server-functions/report-functions"
import { createFileRoute } from "@tanstack/react-router"
import dayjs from "dayjs"
import { DownloadIcon, SearchIcon } from "lucide-react"
import Papa from "papaparse"
import React, { useEffect, useState } from "react"

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export const Route = createFileRoute("/dashboard/company/$companyId/reports/delivery-slip")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()
  const [report, setReport] = useState<LisaDeliverySlipReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true)
      try {
        const reportResponse = await getDeliverySlipReport({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: {
            companyId: company.companyId,
            limit: 100
          }
        })
        setReport(reportResponse)
      } catch (error) {
        console.error("Failed to fetch delivery slip report", error)
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [company])

  const exportCSV = () => {
    if (!report) return

    const csvRows = report.data.flatMap((delivery) =>
      delivery.tags.length > 0
        ? delivery.tags.map((tag) => ({
            deliverySlipId: delivery.deliverySlipId,
            deliveryDate: delivery.deliveryDate,
            customerId: delivery.customerId,
            customerOrderId: delivery.customerOrderId,
            inventoryGroupId: delivery.inventoryGroupId,
            shipMode: delivery.shipMode,
            carrier: delivery.carrier,
            truckNumber: delivery.truckNumber,
            posted: delivery.posted,
            linkedOrderIds: delivery.linkedOrderIds.join(", "),
            linkedInvoiceIds: delivery.linkedInvoiceIds.join(", "),
            deliveryTagCount: delivery.tagCount,
            deliveryTotalPieces: delivery.totalPieces,
            deliveryTotalFBM: delivery.totalFBM,
            deliveryTotalM3: delivery.totalM3,
            tagId: tag.tagId,
            productId: tag.productId,
            productDescription: tag.productDescription,
            invoicePricePer1000FBM: tag.invoicePricePer1000FBM,
            tagStatus: tag.status,
            source: tag.source,
            destination: tag.destination,
            sourceDate: tag.sourceDate,
            destinationDate: tag.destinationDate,
            pieces: tag.pieces,
            fbm: tag.fbm,
            m3: tag.m3
          }))
        : [
            {
              deliverySlipId: delivery.deliverySlipId,
              deliveryDate: delivery.deliveryDate,
              customerId: delivery.customerId,
              customerOrderId: delivery.customerOrderId,
              inventoryGroupId: delivery.inventoryGroupId,
              shipMode: delivery.shipMode,
              carrier: delivery.carrier,
              truckNumber: delivery.truckNumber,
              posted: delivery.posted,
              linkedOrderIds: delivery.linkedOrderIds.join(", "),
              linkedInvoiceIds: delivery.linkedInvoiceIds.join(", "),
              deliveryTagCount: delivery.tagCount,
              deliveryTotalPieces: delivery.totalPieces,
              deliveryTotalFBM: delivery.totalFBM,
              deliveryTotalM3: delivery.totalM3,
              tagId: "",
              productId: "",
              productDescription: "",
              invoicePricePer1000FBM: null,
              tagStatus: "",
              source: "",
              destination: "",
              sourceDate: "",
              destinationDate: "",
              pieces: 0,
              fbm: 0,
              m3: 0
            }
          ]
    )

    const csv = Papa.unparse(csvRows)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lisa-delivery-slip-report-${dayjs().format("YYYY-MM-DD")}.csv`
    a.click()
  }

  const filteredData =
    report?.data.filter((delivery) => {
      if (!debouncedSearchQuery) return true
      const searchLower = debouncedSearchQuery.toLowerCase()
      return (
        delivery.deliverySlipId.toLowerCase().includes(searchLower) ||
        delivery.customerId?.toLowerCase().includes(searchLower) ||
        delivery.customerOrderId?.toLowerCase().includes(searchLower) ||
        delivery.linkedOrderIds.some((orderId) => orderId.toLowerCase().includes(searchLower)) ||
        delivery.linkedInvoiceIds.some((invoiceId) => invoiceId.toLowerCase().includes(searchLower))
      )
    }) ?? []

  return (
    <div className="space-y-4">
      <h2>Delivery slip report</h2>

      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4" />
          <Input
            placeholder="Search delivery slips"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 max-w-72"
          />
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <DownloadIcon />
          Export CSV
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
        </div>
      ) : !report ? (
        <div>No report data available</div>
      ) : (
        <div className="w-full max-w-full overflow-x-auto border rounded-md">
          <Table className="min-w-max text-xs">
            <TableBody>
              {filteredData.map((delivery) => (
                <React.Fragment key={delivery.deliverySlipId}>
                  <TableRow className="bg-gray-200 hover:bg-gray-300">
                    <TableCell colSpan={11} className="py-2 font-medium">
                      <div>
                        <span className="inline-block w-36">Delivery Slip ID:</span> {delivery.deliverySlipId}
                      </div>
                      <div>
                        <span className="inline-block w-36">Date:</span>{" "}
                        {delivery.deliveryDate ? dayjs(delivery.deliveryDate).format("YYYY-MM-DD") : "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Customer / Cust Order:</span> {delivery.customerId || "-"} /{" "}
                        {delivery.customerOrderId || "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Order IDs:</span> {delivery.linkedOrderIds.join(", ") || "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Invoice IDs:</span>{" "}
                        {delivery.linkedInvoiceIds.join(", ") || "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Ship mode / Carrier:</span> {delivery.shipMode || "-"} /{" "}
                        {delivery.carrier || "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Totals:</span>
                        <Number value={delivery.totalPieces} /> pcs | <Number value={delivery.totalFBM} /> FBM |{" "}
                        <Number value={delivery.totalM3} /> M3 ({delivery.tagCount} tags)
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-muted/50">
                    <TableHead className="py-2">Tag</TableHead>
                    <TableHead className="py-2">Product</TableHead>
                    <TableHead className="py-2">Status</TableHead>
                    <TableHead className="py-2">Invoice $/1000 FBM</TableHead>
                    <TableHead className="py-2">Source</TableHead>
                    <TableHead className="py-2">Destination</TableHead>
                    <TableHead className="py-2">Source Date</TableHead>
                    <TableHead className="py-2">Dest Date</TableHead>
                    <TableHead className="py-2">Pieces</TableHead>
                    <TableHead className="py-2">FBM</TableHead>
                    <TableHead className="py-2">M3</TableHead>
                  </TableRow>
                  {delivery.tags.map((tag) => (
                    <TableRow key={`${delivery.deliverySlipId}-${tag.tagId}`} className="hover:bg-muted/50">
                      <TableCell className="py-2">{tag.tagId}</TableCell>
                      <TableCell className="py-2 min-w-[240px]">
                        <div className="text-gray-500">{tag.productId}</div>
                        <div>{tag.productDescription}</div>
                      </TableCell>
                      <TableCell className="py-2">{tag.status || "-"}</TableCell>
                      <TableCell className="py-2">
                        {tag.invoicePricePer1000FBM === null ? "-" : <Currency value={tag.invoicePricePer1000FBM} />}
                      </TableCell>
                      <TableCell className="py-2">{tag.source || "-"}</TableCell>
                      <TableCell className="py-2">{tag.destination || "-"}</TableCell>
                      <TableCell className="py-2">
                        {tag.sourceDate ? dayjs(tag.sourceDate).format("YYYY-MM-DD") : "-"}
                      </TableCell>
                      <TableCell className="py-2">
                        {tag.destinationDate ? dayjs(tag.destinationDate).format("YYYY-MM-DD") : "-"}
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={tag.pieces} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={tag.fbm} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={tag.m3} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {delivery.tags.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-4">
                        No tags linked by delivery slip destination
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-4">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div style={{ height: 100 }} />
    </div>
  )
}
