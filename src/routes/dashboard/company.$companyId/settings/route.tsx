import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/settings")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()
  const location = useLocation()

  let activeTab = "company"

  switch (true) {
    case location.pathname.includes("/settings/company"):
      activeTab = "company"
      break
    case location.pathname.includes("/settings/locations"):
      activeTab = "locations"
      break
    case location.pathname.includes("/settings/integrations"):
      activeTab = "integrations"
      break
    case location.pathname.includes("/settings/billing"):
      activeTab = "billing"
      break
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Tabs value={activeTab}>
          <TabsList className="w-max">
            <TabsTrigger value="company" asChild>
              <Link
                to="/dashboard/company/$companyId/settings/company"
                params={{ companyId: company.companyId.toString() }}
              >
                Company
              </Link>
            </TabsTrigger>
            <TabsTrigger value="locations" asChild>
              <Link
                to="/dashboard/company/$companyId/settings/locations"
                params={{ companyId: company.companyId.toString() }}
              >
                Locations
              </Link>
            </TabsTrigger>
            <TabsTrigger value="integrations" asChild>
              <Link
                to="/dashboard/company/$companyId/settings/integrations"
                params={{ companyId: company.companyId.toString() }}
              >
                Integrations
              </Link>
            </TabsTrigger>
            <TabsTrigger value="billing" asChild>
              <Link
                to="/dashboard/company/$companyId/settings/billing"
                params={{ companyId: company.companyId.toString() }}
              >
                Billing
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Outlet />

      <div style={{ height: 100 }} />
    </div>
  )
}
