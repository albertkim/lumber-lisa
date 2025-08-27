import { Number } from "@/components/formatting/Number"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { LisaCurrentInventoryReport } from "@/models"
import { getCurrentInventoryReport } from "@/server/server-functions/report-functions"
import { createFileRoute } from "@tanstack/react-router"
import dayjs from "dayjs"
import { DownloadIcon, SearchIcon } from "lucide-react"
import Papa from "papaparse"
import { useEffect, useState } from "react"

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

export const Route = createFileRoute("/dashboard/company/$companyId/reports/inventory")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()
  const [report, setReport] = useState<LisaCurrentInventoryReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [locationFilter, setLocationFilter] = useState("")
  const [productFilter, setProductFilter] = useState("")
  const debouncedLocationFilter = useDebounce(locationFilter, 300)
  const debouncedProductFilter = useDebounce(productFilter, 300)

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true)
      try {
        const reportResponse = await getCurrentInventoryReport({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: {
            companyId: company.companyId
          }
        })
        setReport(reportResponse)
      } catch (error) {
        console.error("Failed to fetch inventory report", error)
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
    a.download = `lisa-inventory-report-${dayjs().format("YYYY-MM-DD")}.csv`
    a.click()
  }

  const filteredData =
    report?.data?.filter((row) => {
      const locationMatch =
        !debouncedLocationFilter || row["Location ID"]?.toLowerCase().includes(debouncedLocationFilter.toLowerCase())
      const productMatch =
        !debouncedProductFilter ||
        row["Product Description"]?.toLowerCase().includes(debouncedProductFilter.toLowerCase())
      return locationMatch && productMatch
    }) ?? []

  return (
    <div className="space-y-4">
      <h2>Current inventory report</h2>

      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4" />
          <Input
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="pl-8 max-w-72"
          />
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4" />
          <Input
            placeholder="Filter by product name"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
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
            <TableHeader>
              <TableRow>
                <TableHead className="py-2">Product</TableHead>
                <TableHead className="py-2">Species</TableHead>
                <TableHead className="py-2">Grade</TableHead>
                <TableHead className="py-2">Thickness</TableHead>
                <TableHead className="py-2">Width</TableHead>
                <TableHead className="py-2">Location</TableHead>
                <TableHead className="py-2">Inventory Group</TableHead>
                <TableHead className="py-2">Total Pieces</TableHead>
                <TableHead className="py-2">Total FBM</TableHead>
                <TableHead className="py-2">Total M3</TableHead>
                <TableHead className="py-2">Number of Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="py-2 min-w-[250px]">
                    <div className="text-gray-500">{row["Product ID"]}</div>
                    <div>{row["Product Description"]}</div>
                  </TableCell>
                  <TableCell className="py-2">{row["Product Species"]}</TableCell>
                  <TableCell className="py-2">{row["Product Grade"]}</TableCell>
                  <TableCell className="py-2">{row["Product Thickness"]}</TableCell>
                  <TableCell className="py-2">{row["Product Width"]}</TableCell>
                  <TableCell className="py-2">{row["Location ID"]}</TableCell>
                  <TableCell className="py-2">
                    <div className="text-gray-500">{row["Inventory Group ID"]}</div>
                    <div>{row["Inventory Group Name"]}</div>
                  </TableCell>
                  <TableCell className="py-2">
                    <Number value={row["Total Pieces"]} />
                  </TableCell>
                  <TableCell className="py-2">
                    <Number value={row["Total FBM"]} />
                  </TableCell>
                  <TableCell className="py-2">
                    <Number value={row["Total M3"]} />
                  </TableCell>
                  <TableCell className="py-2">
                    <Number value={row["Number of Tags"]} />
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell className="text-center py-4">No data available</TableCell>
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
