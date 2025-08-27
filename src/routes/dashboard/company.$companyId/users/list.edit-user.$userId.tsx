import { useAuth } from "@/contexts/AuthContext"
import { UserForm } from "@/pages/UserForm"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/company/$companyId/users/list/edit-user/$userId")({
  component: RouteComponent
})

function RouteComponent() {
  const { company, user } = useAuth()
  const { userId } = Route.useParams()
  const navigate = useNavigate()

  const onClose = () => {
    navigate({
      to: "/dashboard/company/$companyId/users/list",
      params: { companyId: company!.companyId.toString() }
    })
  }
  return <UserForm user={user} company={company} editUserId={parseInt(userId)} onClose={onClose} />
}
