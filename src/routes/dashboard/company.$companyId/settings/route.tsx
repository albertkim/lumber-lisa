import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/settings")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = Route.useRouteContext()

  let activeTab = "locations"

  switch (true) {
    case location.pathname.includes("/settings/billing"):
      activeTab = "billing"
      break
    case location.pathname.includes("/settings/company"):
      activeTab = "company"
      break
    case location.pathname.includes("/settings/api"):
      activeTab = "api"
      break
    case location.pathname.includes("/settings/taxes"):
      activeTab = "taxes"
      break
    case location.pathname.includes("/settings/integrations"):
      activeTab = "integrations"
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
            <TabsTrigger value="billing" asChild>
              <Link
                to="/dashboard/company/$companyId/settings/billing"
                params={{ companyId: company.companyId.toString() }}
              >
                Billing
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
          </TabsList>
        </Tabs>
      </div>

      <Outlet />

      <div style={{ height: 100 }} />
    </div>
  )
}
