import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { getCompanyUsers } from "@/server/server-functions/company-user-functions"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/users/list")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()

  const { data: usersResponse, isLoading } = useQuery({
    queryKey: ["users", company.companyId],
    queryFn: async () => {
      return await getCompanyUsers({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: {
          companyId: company.companyId
        }
      })
    }
  })

  const users = usersResponse?.data || []

  return (
    <div>
      <Button className="mb-4" asChild>
        <Link
          to="/dashboard/company/$companyId/users/list/add-user"
          params={{ companyId: company!.companyId.toString() }}
        >
          Add user
        </Link>
      </Button>
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userEmail}</TableCell>
                <TableCell>{user.userFullName}</TableCell>
                <TableCell>
                  <Link
                    to="/dashboard/company/$companyId/users/list/edit-user/$userId"
                    params={{ companyId: company!.companyId.toString(), userId: user.userId.toString() }}
                    className="underline"
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Outlet />
    </div>
  )
}
