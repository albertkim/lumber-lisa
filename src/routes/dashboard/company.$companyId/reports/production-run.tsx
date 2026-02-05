import { Number } from "@/components/formatting/Number"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { LisaProductionRunReport } from "@/models"
import { getProductionRunReport } from "@/server/server-functions/report-functions"
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

export const Route = createFileRoute("/dashboard/company/$companyId/reports/production-run")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()
  const [report, setReport] = useState<LisaProductionRunReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [runSearchQuery, setRunSearchQuery] = useState("")
  const [productSearchQuery, setProductSearchQuery] = useState("")
  const debouncedRunSearchQuery = useDebounce(runSearchQuery, 300)
  const debouncedProductSearchQuery = useDebounce(productSearchQuery, 300)

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true)
      try {
        const reportResponse = await getProductionRunReport({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: {
            companyId: company.companyId,
            limit: 50
          }
        })
        setReport(reportResponse)
      } catch (error) {
        console.error("Failed to fetch production run report", error)
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [company])

  const exportCSV = () => {
    if (!report) return
    const csvRows = report.data.flatMap((run) =>
      run.products.length > 0
        ? run.products.map((product) => ({
            runId: run.runId,
            runDate: run.runDate,
            runStatus: run.runStatus,
            machineId: run.machineId,
            profileId: run.profileId,
            workOrderId: run.workOrderId,
            supplierId: run.supplierId,
            inventoryGroupId: run.inventoryGroupId,
            inputTagCount: run.inputTagCount,
            outputTagCount: run.outputTagCount,
            runInputPieces: run.inputPieces,
            runInputFBM: run.inputFBM,
            runInputM3: run.inputM3,
            runOutputPieces: run.outputPieces,
            runOutputFBM: run.outputFBM,
            runOutputM3: run.outputM3,
            runDeltaPieces: run.deltaPieces,
            runDeltaFBM: run.deltaFBM,
            runDeltaM3: run.deltaM3,
            productId: product.productId,
            productDescription: product.productDescription,
            productInputPieces: product.inputPieces,
            productInputFBM: product.inputFBM,
            productInputM3: product.inputM3,
            productOutputPieces: product.outputPieces,
            productOutputFBM: product.outputFBM,
            productOutputM3: product.outputM3,
            productDeltaPieces: product.deltaPieces,
            productDeltaFBM: product.deltaFBM,
            productDeltaM3: product.deltaM3
          }))
        : [
            {
              runId: run.runId,
              runDate: run.runDate,
              runStatus: run.runStatus,
              machineId: run.machineId,
              profileId: run.profileId,
              workOrderId: run.workOrderId,
              supplierId: run.supplierId,
              inventoryGroupId: run.inventoryGroupId,
              inputTagCount: run.inputTagCount,
              outputTagCount: run.outputTagCount,
              runInputPieces: run.inputPieces,
              runInputFBM: run.inputFBM,
              runInputM3: run.inputM3,
              runOutputPieces: run.outputPieces,
              runOutputFBM: run.outputFBM,
              runOutputM3: run.outputM3,
              runDeltaPieces: run.deltaPieces,
              runDeltaFBM: run.deltaFBM,
              runDeltaM3: run.deltaM3,
              productId: "",
              productDescription: "",
              productInputPieces: 0,
              productInputFBM: 0,
              productInputM3: 0,
              productOutputPieces: 0,
              productOutputFBM: 0,
              productOutputM3: 0,
              productDeltaPieces: 0,
              productDeltaFBM: 0,
              productDeltaM3: 0
            }
          ]
    )

    const csv = Papa.unparse(csvRows)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lisa-production-run-report-${dayjs().format("YYYY-MM-DD")}.csv`
    a.click()
  }

  const filteredRuns =
    report?.data
      .filter((run) => {
        if (!debouncedRunSearchQuery) return true
        const searchLower = debouncedRunSearchQuery.toLowerCase()
        return (
          run.runId.toLowerCase().includes(searchLower) ||
          run.machineId?.toLowerCase().includes(searchLower) ||
          run.profileId?.toLowerCase().includes(searchLower) ||
          run.workOrderId?.toLowerCase().includes(searchLower) ||
          run.supplierId?.toLowerCase().includes(searchLower) ||
          run.inventoryGroupId?.toLowerCase().includes(searchLower)
        )
      })
      .map((run) => ({
        ...run,
        products: run.products.filter((product) => {
          if (!debouncedProductSearchQuery) return true
          const searchLower = debouncedProductSearchQuery.toLowerCase()
          return (
            product.productId.toLowerCase().includes(searchLower) ||
            product.productDescription?.toLowerCase().includes(searchLower)
          )
        })
      }))
      .filter((run) => !debouncedProductSearchQuery || run.products.length > 0) ?? []

  return (
    <div className="space-y-4">
      <h2>Production run report</h2>

      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4" />
          <Input
            placeholder="Search runs"
            value={runSearchQuery}
            onChange={(e) => setRunSearchQuery(e.target.value)}
            className="pl-8 max-w-72"
          />
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4" />
          <Input
            placeholder="Search products"
            value={productSearchQuery}
            onChange={(e) => setProductSearchQuery(e.target.value)}
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
              {filteredRuns.map((run) => (
                <React.Fragment key={run.runId}>
                  <TableRow className="bg-gray-200 hover:bg-gray-300">
                    <TableCell colSpan={11} className="py-2 font-medium">
                      <div>
                        <span className="inline-block w-36">Run ID:</span> {run.runId}
                      </div>
                      <div>
                        <span className="inline-block w-36">Date:</span>{" "}
                        {run.runDate ? dayjs(run.runDate).format("YYYY-MM-DD") : "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Status:</span> {run.runStatus || "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Machine / Profile:</span> {run.machineId || "-"} /{" "}
                        {run.profileId || "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Work Order:</span> {run.workOrderId || "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Supplier / InvGrp:</span> {run.supplierId || "-"} /{" "}
                        {run.inventoryGroupId || "-"}
                      </div>
                      <div>
                        <span className="inline-block w-36">Run totals:</span>
                        In <Number value={run.inputFBM} /> FBM ({run.inputTagCount} tags) | Out{" "}
                        <Number value={run.outputFBM} /> FBM ({run.outputTagCount} tags) | Delta{" "}
                        <Number value={run.deltaFBM} /> FBM
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-muted/50">
                    <TableHead className="py-2">Product</TableHead>
                    <TableHead className="py-2">Input Pieces</TableHead>
                    <TableHead className="py-2">Input FBM</TableHead>
                    <TableHead className="py-2">Input M3</TableHead>
                    <TableHead className="py-2">Output Pieces</TableHead>
                    <TableHead className="py-2">Output FBM</TableHead>
                    <TableHead className="py-2">Output M3</TableHead>
                    <TableHead className="py-2">Delta Pieces</TableHead>
                    <TableHead className="py-2">Delta FBM</TableHead>
                    <TableHead className="py-2">Delta M3</TableHead>
                  </TableRow>
                  {run.products.map((product) => (
                    <TableRow key={`${run.runId}-${product.productId}`} className="hover:bg-muted/50">
                      <TableCell className="py-2 min-w-[250px]">
                        <div className="text-gray-500">{product.productId}</div>
                        <div>{product.productDescription}</div>
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={product.inputPieces} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={product.inputFBM} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={product.inputM3} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={product.outputPieces} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={product.outputFBM} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={product.outputM3} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={product.deltaPieces} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={product.deltaFBM} />
                      </TableCell>
                      <TableCell className="py-2">
                        <Number value={product.deltaM3} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {run.products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-4">
                        No product flow data available for this run
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
              {filteredRuns.length === 0 && (
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
