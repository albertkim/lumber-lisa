import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/company/$companyId/activity-logs',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/company/$companyId/activity-logs"!</div>
}
