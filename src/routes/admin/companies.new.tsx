import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/companies/new")({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/admin/companies/new"!</div>
}
