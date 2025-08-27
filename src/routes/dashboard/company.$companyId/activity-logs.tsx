import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { getActivityLogs } from "@/server/server-functions/activity-log-functions"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/activity-logs")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()

  const {
    data: activityLogs,
    isPending,
    error
  } = useQuery({
    queryKey: ["activity-logs", company.companyId],
    queryFn: async () =>
      await getActivityLogs({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: { companyId: company.companyId }
      })
  })

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Metadata</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <>
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={6}>
                  <div className="flex items-center justify-center">
                    <Skeleton className="h-4 w-[250px]" />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={6}>
                  <div className="flex items-center justify-center">
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={6}>
                  <div className="flex items-center justify-center">
                    <Skeleton className="h-4 w-[225px]" />
                  </div>
                </TableCell>
              </TableRow>
            </>
          ) : (
            activityLogs?.data.map((log) => (
              <TableRow key={log.activityLogId}>
                <TableCell>{new Date(log.createDate).toLocaleString()}</TableCell>
                <TableCell>{log.userFullName || log.userEmail || "-"}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.type}</TableCell>
                <TableCell>{log.title}</TableCell>
                <TableCell>{log.description || "-"}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <span className="underline cursor-pointer">Metadata</span>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px]">
                      <pre className="text-xs overflow-auto">{JSON.stringify(log.data, null, 2) || "-"}</pre>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
