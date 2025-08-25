import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/profile")({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/dashboard/company/$companyId/profile"!</div>
}
