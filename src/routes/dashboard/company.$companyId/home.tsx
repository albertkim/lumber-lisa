import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/home")({
  component: RouteComponent
})

function RouteComponent() {
  const { user } = Route.useRouteContext()

  return (
    <div>
      <h1>Good morning, {user.userFullName}</h1>
    </div>
  )
}
