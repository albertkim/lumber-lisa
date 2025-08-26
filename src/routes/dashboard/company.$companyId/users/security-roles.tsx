import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/company/$companyId/users/security-roles',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/company/$companyId/users/security-roles"!</div>
}
