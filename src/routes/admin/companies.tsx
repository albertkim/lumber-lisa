import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/companies")({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/admin/companies"!</div>
}
