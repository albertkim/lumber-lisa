import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/server/server-functions/get-current-user"
import { createFileRoute, isRedirect, Link, Outlet, redirect } from "@tanstack/react-router"
import { Building, Home } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw redirect({ to: "/login" })

      const user = await getCurrentUser({
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!user.isAdmin) {
        throw redirect({ to: "/dashboard" })
      }

      if (location.pathname === "/admin") {
        throw redirect({
          to: "/admin/companies"
        })
      }

      return { user }
    } catch (err) {
      // Re-throw router redirects; only send real errors to /login
      if (isRedirect(err)) throw err
      throw redirect({ to: "/login" })
    }
  }
})

function RouteComponent() {
  const [expanded, setExpanded] = useState(true)

  return (
    <SidebarProvider open={expanded} onOpenChange={setExpanded}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/companies">
                        <Building />
                        <span>Companies</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/companies/new">
                        <Building />
                        <span>Add Company</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard">
                        <Home />
                        <span>Back to dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarTrigger />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-4">
          <div className="flex items-center text-gray-800 mb-4">
            <SidebarTrigger />
            <div>Admin Dashboard</div>
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
