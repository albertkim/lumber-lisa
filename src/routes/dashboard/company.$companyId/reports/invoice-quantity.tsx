import { Currency } from "@/components/formatting/Currency"
import { Number } from "@/components/formatting/Number"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { LisaInventoryQuantityReport } from "@/models"
import { getInvoiceQuantityReport } from "@/server/server-functions/report-functions"
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

export const Route = createFileRoute("/dashboard/company/$companyId/reports/invoice-quantity")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()
  const [report, setReport] = useState<LisaInventoryQuantityReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true)
      try {
        const reportResponse = await getInvoiceQuantityReport({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: {
            companyId: company.companyId
          }
        })
        setReport(reportResponse)
      } catch (error) {
        console.error("Failed to fetch Lisa report", error)
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [company])

  const exportCSV = () => {
    if (!report) return
    const csv = Papa.unparse(report.data)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lisa-report-${dayjs().format("YYYY-MM-DD")}.csv`
    a.click()
  }

  const filteredData =
    report?.data?.filter((row) => {
      if (!debouncedSearchQuery) return true
      const searchLower = debouncedSearchQuery.toLowerCase()
      return (
        row["Order ID"]?.toLowerCase().includes(searchLower) ||
        row["Customer Name"]?.toLowerCase().includes(searchLower) ||
        row["Customer Order ID"]?.toLowerCase().includes(searchLower) ||
        row["Order First Description"]?.toLowerCase().includes(searchLower)
      )
    }) ?? []

  return (
    <div className="space-y-4">
      <h2>Open order invoice quantity report</h2>

      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4" />
          <Input
            placeholder="Search orders"
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
        <div className="overflow-x-auto border rounded-md">
          <Table className="w-full text-xs">
            <TableBody>
              {filteredData.map((row, index) => {
                const isNewOrderGroup = index === 0 || row["Order ID"] !== filteredData[index - 1]["Order ID"]
                return (
                  <React.Fragment key={index}>
                    {isNewOrderGroup && (
                      <>
                        <TableRow className="bg-gray-200 hover:bg-gray-300">
                          <TableCell colSpan={9} className="py-2 font-medium">
                            <div>
                              <span className="inline-block w-36">LISA Order ID:</span> {row["Order ID"]}
                            </div>
                            <div>
                              <span className="inline-block w-36">Customer Name:</span> {row["Customer Name"]}
                            </div>
                            <div>
                              <span className="inline-block w-36">Customer Order ID:</span> {row["Customer Order ID"]}
                            </div>
                            <div>
                              <span className="inline-block w-36">Order 1st Description:</span>{" "}
                              {row["Order First Description"]}
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/50">
                          <TableHead className="py-2">Product</TableHead>
                          <TableHead className="py-2">Order Volume</TableHead>
                          <TableHead className="py-2">Order Price Per</TableHead>
                          <TableHead className="py-2">Order Unit</TableHead>
                          <TableHead className="py-2">Invoiced</TableHead>
                          <TableHead className="py-2">Remaining</TableHead>
                        </TableRow>
                      </>
                    )}
                    <TableRow className="hover:bg-muted/50">
                      <TableCell className="py-2 min-w-[250px]">
                        <div className="text-gray-500">{row["Product ID"]}</div>
                        <div>{row["Product Description"]}</div>
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={row["Order Volume"]} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Currency value={row["Order Price Per"]} />
                      </TableCell>
                      <TableCell className="py-2">{row["Order Unit"]}</TableCell>
                      <TableCell className="py-2">
                        <Number value={row["Invoiced"]} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={row["Remaining"]} />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                )
              })}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-4">
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
