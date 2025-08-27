import { AuthProvider } from "@/contexts/AuthContext"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async () => {
    const token = localStorage.getItem("token")
    if (!token) throw redirect({ to: "/login" })
  }
})

function RouteComponent() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
