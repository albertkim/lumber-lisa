import { UserForm } from "@/pages/UserForm"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/users/list/add-user")({
  component: RouteComponent
})

function RouteComponent() {
  const { company, user } = Route.useRouteContext()
  const navigate = useNavigate()

  const onClose = () => {
    navigate({
      to: "/dashboard/company/$companyId/users/list",
      params: {
        companyId: company!.companyId.toString()
      }
    })
  }

  return <UserForm user={user} company={company} editUserId={null} onClose={onClose} />
}
