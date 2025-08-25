import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/company/$companyId/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/company/$companyId/reports"!</div>
}
