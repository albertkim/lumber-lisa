import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/reports/production-run")({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Coming soon...</div>
}
