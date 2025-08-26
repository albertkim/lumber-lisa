import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CompanyUsersResponse } from "@/models"
import { getCompanyUsers } from "@/server/server-functions/company-user-functions"
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/dashboard/company/$companyId/users/list")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = Route.useRouteContext()
  const routerState = useRouterState()
  const [users, setUsers] = useState<CompanyUsersResponse["data"]>([])

  const fetchUsers = async () => {
    const usersResponse = await getCompanyUsers({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        companyId: company!.companyId
      }
    })
    setUsers(usersResponse.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [company])

  // Refresh users when navigation state changes
  useEffect(() => {
    fetchUsers()
  }, [routerState.status])

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
      {users ? (
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
      ) : (
        <Skeleton className="h-10 w-full" />
      )}
      <Outlet />
    </div>
  )
}
