import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/company/$companyId/settings/company',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/company/$companyId/settings/company"!</div>
}
