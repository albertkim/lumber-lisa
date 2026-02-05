import { Number } from "@/components/formatting/Number"
import { Currency } from "@/components/formatting/Currency"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const pageSize = 25
  const [report, setReport] = useState<LisaProductionRunReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [expandedProductKeys, setExpandedProductKeys] = useState<Set<string>>(new Set())
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
            limit: pageSize,
            offset: (page - 1) * pageSize,
            runId: debouncedRunSearchQuery || undefined,
            productQuery: debouncedProductSearchQuery || undefined
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
  }, [company, page, pageSize, debouncedRunSearchQuery, debouncedProductSearchQuery])

  useEffect(() => {
    setPage(1)
  }, [debouncedRunSearchQuery, debouncedProductSearchQuery])

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

  const pageCount = report?.pageCount ?? 0
  const currentPage = report?.page ?? page
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1)
  const visibleRuns = report
    ? report.data.filter((run) => {
        const runDeltaIsZero =
          Math.abs(run.deltaPieces) <= 0.001 && Math.abs(run.deltaFBM) <= 0.01 && Math.abs(run.deltaM3) <= 0.001
        const productsDeltaAreZero = run.products.every(
          (product) =>
            Math.abs(product.deltaPieces) <= 0.001 &&
            Math.abs(product.deltaFBM) <= 0.01 &&
            Math.abs(product.deltaM3) <= 0.001
        )
        return !(runDeltaIsZero && productsDeltaAreZero)
      })
    : []
  const hiddenRunCount = report ? report.data.length - visibleRuns.length : 0

  const toggleProductExpansion = (key: string) => {
    setExpandedProductKeys((previous) => {
      const next = new Set(previous)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

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
              {visibleRuns.map((run) => (
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
                    <React.Fragment key={`${run.runId}-${product.productId}`}>
                      {(() => {
                        const pricedDeliveries = product.deliveries.filter((delivery) => delivery.invoicePricePer1000FBM !== null)
                        const uniquePrices = Array.from(
                          new Set(pricedDeliveries.map((delivery) => delivery.invoicePricePer1000FBM as number))
                        ).sort((a, b) => a - b)
                        const weightedDenominator = pricedDeliveries.reduce((sum, delivery) => sum + delivery.fbm, 0)
                        const weightedAveragePrice =
                          weightedDenominator > 0
                            ? pricedDeliveries.reduce(
                                (sum, delivery) => sum + (delivery.invoicePricePer1000FBM as number) * delivery.fbm,
                                0
                              ) / weightedDenominator
                            : null

                        return (
                      <TableRow
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleProductExpansion(`${run.runId}-${product.productId}`)}
                      >
                        <TableCell className="py-2 min-w-[250px]">
                          <div className="text-gray-500">{product.productId}</div>
                          <div>{product.productDescription}</div>
                          <div className="text-gray-500 text-[11px] mt-1">
                            {product.deliveries.length} invoiced {product.deliveries.length === 1 ? "delivery" : "deliveries"}
                            {uniquePrices.length > 0 && (
                              <>
                                {" "}
                                | Prices: {uniquePrices.map((price, index) => <React.Fragment key={`${price}-${index}`}>{index > 0 ? ", " : ""}<Currency value={price} /></React.Fragment>)}
                                {weightedAveragePrice !== null && (
                                  <>
                                    {" "}
                                    | WAvg: <Currency value={weightedAveragePrice} />
                                  </>
                                )}
                              </>
                            )}
                          </div>
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
                        )
                      })()}
                      {expandedProductKeys.has(`${run.runId}-${product.productId}`) && (
                        <TableRow>
                          <TableCell colSpan={11} className="bg-muted/30 py-3 pl-8">
                            <Tabs defaultValue="deliveries" className="w-full">
                              <TabsList>
                                <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
                                <TabsTrigger value="tags">Tags</TabsTrigger>
                              </TabsList>
                              <TabsContent value="deliveries" className="mt-3">
                                <div className="text-xs font-medium mb-2">
                                  Invoiced deliveries for {product.productId}
                                </div>
                                <div className="overflow-x-auto">
                                  <Table className="min-w-max text-xs">
                                    <TableBody>
                                      <TableRow>
                                        <TableHead>Delivery Slip</TableHead>
                                        <TableHead>Delivery Date</TableHead>
                                        <TableHead>Invoice IDs</TableHead>
                                        <TableHead>Invoice $/1000 FBM</TableHead>
                                        <TableHead>Tags</TableHead>
                                        <TableHead>Pieces</TableHead>
                                        <TableHead>FBM</TableHead>
                                        <TableHead>M3</TableHead>
                                      </TableRow>
                                      {product.deliveries.map((delivery) => (
                                        <TableRow key={`${run.runId}-${product.productId}-${delivery.deliverySlipId}`}>
                                          <TableCell>{delivery.deliverySlipId}</TableCell>
                                          <TableCell>
                                            {delivery.deliveryDate ? dayjs(delivery.deliveryDate).format("YYYY-MM-DD") : "-"}
                                          </TableCell>
                                          <TableCell>{delivery.invoiceIds.join(", ") || "-"}</TableCell>
                                          <TableCell>
                                            {delivery.invoicePricePer1000FBM === null ? "-" : (
                                              <Currency value={delivery.invoicePricePer1000FBM} />
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            <Number value={delivery.tagCount} />
                                          </TableCell>
                                          <TableCell>
                                            <Number value={delivery.pieces} />
                                          </TableCell>
                                          <TableCell>
                                            <Number value={delivery.fbm} />
                                          </TableCell>
                                          <TableCell>
                                            <Number value={delivery.m3} />
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                      {product.deliveries.length === 0 && (
                                        <TableRow>
                                          <TableCell colSpan={8} className="text-center py-2">
                                            No invoiced deliveries found for this product
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </TabsContent>
                              <TabsContent value="tags" className="mt-3">
                                <div className="text-xs font-medium mb-2">
                                  Tags for {product.productId} (in: {product.inputTagCount}, out: {product.outputTagCount})
                                </div>
                                <div className="overflow-x-auto">
                                  <Table className="min-w-max text-xs">
                                    <TableBody>
                                      <TableRow>
                                        <TableHead>Tag</TableHead>
                                        <TableHead>Flow</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>InvGrp</TableHead>
                                        <TableHead>Pieces</TableHead>
                                        <TableHead>FBM</TableHead>
                                        <TableHead>M3</TableHead>
                                        <TableHead>Source Date</TableHead>
                                        <TableHead>Dest Date</TableHead>
                                      </TableRow>
                                      {product.tags.map((tag) => (
                                        <TableRow key={`${run.runId}-${product.productId}-${tag.flow}-${tag.tagId}`}>
                                          <TableCell>{tag.tagId}</TableCell>
                                          <TableCell>{tag.flow}</TableCell>
                                          <TableCell>{tag.status || "-"}</TableCell>
                                          <TableCell>{tag.sourceRunId || "-"}</TableCell>
                                          <TableCell>{tag.destinationRunId || "-"}</TableCell>
                                          <TableCell>{tag.locationId || "-"}</TableCell>
                                          <TableCell>{tag.inventoryGroupId || "-"}</TableCell>
                                          <TableCell>
                                            <Number value={tag.pieces} />
                                          </TableCell>
                                          <TableCell>
                                            <Number value={tag.fbm} />
                                          </TableCell>
                                          <TableCell>
                                            <Number value={tag.m3} />
                                          </TableCell>
                                          <TableCell>
                                            {tag.sourceDate ? dayjs(tag.sourceDate).format("YYYY-MM-DD") : "-"}
                                          </TableCell>
                                          <TableCell>
                                            {tag.destinationDate ? dayjs(tag.destinationDate).format("YYYY-MM-DD") : "-"}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                      {product.tags.length === 0 && (
                                        <TableRow>
                                          <TableCell colSpan={12} className="text-center py-2">
                                            No tags for this product
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                  {run.products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-4">
                        No product flow data available for this run
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
              {visibleRuns.length === 0 && (
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
      {report && pageCount > 0 && (
        <div className="w-full max-w-full overflow-hidden">
          {hiddenRunCount > 0 && (
            <div className="text-gray-500 text-xs mb-2">{hiddenRunCount} pass-through production runs hidden</div>
          )}
          <Pagination className="mx-0 w-full max-w-full justify-start">
            <PaginationContent className="flex-wrap">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  if (currentPage > 1) setPage(currentPage - 1)
                }}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {pageNumbers.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === pageNumber}
                  className={
                    currentPage === pageNumber
                      ? "bg-black text-white hover:bg-black hover:text-white border-black"
                      : undefined
                  }
                  onClick={(event) => {
                    event.preventDefault()
                    setPage(pageNumber)
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  if (currentPage < pageCount) setPage(currentPage + 1)
                }}
                className={currentPage >= pageCount ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      <div style={{ height: 100 }} />
    </div>
  )
}
