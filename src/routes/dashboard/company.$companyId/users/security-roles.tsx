import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { getSecurityRoles } from "@/server/server-functions/security-role-functions"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/users/security-roles")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()

  const {
    data: securityRoles,
    isPending,
    error
  } = useQuery({
    queryKey: ["security-roles", company.companyId],
    queryFn: async () =>
      await getSecurityRoles({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: {
          companyId: company.companyId
        }
      })
  })

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Permissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {securityRoles?.data.map((securityRole) => (
            <TableRow key={securityRole.securityRoleId}>
              <TableCell>{securityRole.securityRoleName}</TableCell>
              <TableCell>{securityRole.permissions.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
