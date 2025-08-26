import { getCompany } from "@/server-functions/company-get"
import { createFileRoute, isRedirect, Outlet, redirect } from "@tanstack/react-router"
import { getCurrentUser } from "../../server-functions/get-current-user"

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw redirect({ to: "/login" })

      const user = await getCurrentUser({
        headers: { Authorization: `Bearer ${token}` }
      })

      const company = await getCompany({
        headers: { Authorization: `Bearer ${token}` },
        data: {
          companyId: user.company.companyId
        }
      })

      if (location.pathname === "/dashboard") {
        throw redirect({
          to: "/dashboard/company/$companyId/home",
          params: { companyId: company.companyId.toString() }
        })
      }

      return { user, company }
    } catch (err) {
      // Re-throw router redirects; only send real errors to /login
      if (isRedirect(err)) throw err
      throw redirect({ to: "/login" })
    }
  }
})

function RouteComponent() {
  return <Outlet />
}
