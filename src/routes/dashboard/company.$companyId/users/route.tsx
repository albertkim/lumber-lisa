import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createFileRoute("/dashboard/company/$companyId/users")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (company && location.pathname.endsWith("/users")) {
      navigate({
        to: "/dashboard/company/$companyId/users/list",
        params: { companyId: company.companyId.toString() }
      })
    }
  }, [company])

  if (!company) return null

  // Determine active tab based on current route path
  const activeTab = location.pathname.includes("/users/add-user")
    ? "add-user"
    : location.pathname.includes("/users/security-roles")
      ? "roles"
      : "list"

  return (
    <div className="space-y-4">
      <Tabs value={activeTab}>
        <TabsList>
          <TabsTrigger value="list" asChild>
            <Link to="/dashboard/company/$companyId/users/list" params={{ companyId: company.companyId.toString() }}>
              Users
            </Link>
          </TabsTrigger>
          <TabsTrigger value="roles" asChild>
            <Link
              to="/dashboard/company/$companyId/users/security-roles"
              params={{ companyId: company.companyId.toString() }}
            >
              Security roles
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Outlet />
    </div>
  )
}
