import { useAuth } from "@/contexts/AuthContext"
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createFileRoute("/dashboard/company/$companyId/reports")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()
  const currentRoute = useRouterState().matches.at(-1)!.routeId
  const navigate = useNavigate({ from: "/dashboard/company/$companyId/reports" })

  useEffect(() => {
    if (currentRoute === "/dashboard/company/$companyId/reports") {
      navigate({
        to: "/dashboard/company/$companyId/reports/invoice-quantity",
        params: { companyId: company!.companyId.toString() },
        replace: true
      })
    }
  }, [currentRoute])

  return (
    <div className="flex min-w-0 flex-col gap-4 md:flex-row">
      <div className="sidebar mb-4 md:mb-0 md:w-64 flex-shrink-0">
        <h1 className="text-lg font-semibold mb-4">LISA Reports</h1>
        <nav className="reports-nav flex flex-wrap md:flex-col gap-1 text-sm">
          <Link
            className="hover:bg-gray-100 rounded p-2"
            activeProps={{ className: "bg-gray-100 font-medium" }}
            to="/dashboard/company/$companyId/reports/invoice-quantity"
            params={{ companyId: company!.companyId.toString() }}
          >
            Invoice quantity
          </Link>
          <Link
            className="hover:bg-gray-100 rounded p-2"
            activeProps={{ className: "bg-gray-100 font-medium" }}
            to="/dashboard/company/$companyId/reports/inventory"
            params={{ companyId: company!.companyId.toString() }}
          >
            Inventory
          </Link>
          <Link
            className="hover:bg-gray-100 rounded p-2"
            activeProps={{ className: "bg-gray-100 font-medium" }}
            to="/dashboard/company/$companyId/reports/production-run"
            params={{ companyId: company!.companyId.toString() }}
          >
            Production run
          </Link>
        </nav>
      </div>
      <div className="content min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}
