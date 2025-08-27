import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminCompaniesWithDetailsResponse } from "@/models"
import { getCompanies } from "@/server/server-functions/admin-functions"
import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/admin/companies/")({
  component: RouteComponent
})

function RouteComponent() {
  const [companies, setCompanies] = useState<AdminCompaniesWithDetailsResponse | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getCompanies({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setCompanies(response)
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Name</TableHead>
              <TableHead className="text-xs">Email</TableHead>
              <TableHead className="text-xs">User Role</TableHead>
              <TableHead className="text-xs">System Role</TableHead>
              <TableHead className="text-xs">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies?.data.map((company) => (
              <>
                <TableRow key={`company-${company.companyId}`} className="bg-gray-200">
                  <TableCell colSpan={5} className="text-xs">
                    <Link
                      to="/dashboard/company/$companyId/home"
                      params={{ companyId: company.companyId.toString() }}
                      className="underline"
                      target="_blank"
                    >
                      {company.companyId}: {company.companyName || "-"}
                    </Link>
                  </TableCell>
                </TableRow>
                {company.users.map((user) => (
                  <TableRow key={`user-${user.userId}`}>
                    <TableCell className="min-w-[200px] text-xs">{user.userFullName}</TableCell>
                    <TableCell className="min-w-[200px] text-xs">{user.userEmail}</TableCell>
                    <TableCell className="min-w-[200px] text-xs">{user.securityRoleId}</TableCell>
                    <TableCell className="min-w-[200px] text-xs">{user.isAdmin ? "Admin" : "User"}</TableCell>
                    <TableCell className="min-w-[200px] text-xs">
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Disable
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
      <br />
    </div>
  )
}
