import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { Company, User } from "@/models"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { Brain, FileText, Home, LogOut, Settings, User as UserIcon, Users } from "lucide-react"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/dashboard/company/$companyId")({
  component: RouteComponent
})

function RouteComponent() {
  const { user, company } = useAuth()
  const { companyId } = Route.useParams()
  const companyIdNumber = parseInt(companyId)

  return (
    <SidebarProvider>
      <div className="flex w-full h-[100dvh] overflow-hidden">
        <AppSidebar companyId={companyIdNumber} user={user} company={company} />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex items-center text-gray-800 p-4 border-b shrink-0">
            <SidebarTrigger />
            <nav className="flex items-center gap-2">{company.companyName}</nav>
          </div>
          <div className="flex-1 overflow-y-auto mt-4 px-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export function AppSidebar({ companyId, user, company }: { companyId: number; user: User; company: Company }) {
  const { setOpen, setOpenMobile, isMobile } = useSidebar()
  const [logoutConfirm, setLogoutConfirm] = useState(false)

  useEffect(() => {
    setOpen(!isMobile)
    setOpenMobile(false)
  }, [isMobile])

  useEffect(() => {
    if (logoutConfirm) {
      setTimeout(() => {
        setLogoutConfirm(false)
      }, 3000)
    }
  }, [logoutConfirm])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Lumber</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/company/$companyId/home"
                    params={{ companyId: companyId.toString() }}
                    activeProps={{ className: "bg-gray-100" }}
                  >
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Reports</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/company/$companyId/reports"
                    params={{ companyId: companyId.toString() }}
                    activeProps={{ className: "bg-gray-100" }}
                  >
                    <FileText />
                    <span>LISA reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/company/$companyId/ai"
                    params={{ companyId: companyId.toString() }}
                    activeProps={{ className: "bg-gray-100" }}
                  >
                    <Brain />
                    <span>AI</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/company/$companyId/users"
                    params={{ companyId: companyId.toString() }}
                    activeProps={{ className: "bg-gray-100" }}
                  >
                    <Users />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/company/$companyId/activity-logs"
                    params={{ companyId: companyId.toString() }}
                    activeProps={{ className: "bg-gray-100" }}
                  >
                    <FileText />
                    <span>Activity logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/company/$companyId/settings/company"
                    params={{ companyId: companyId.toString() }}
                    activeProps={{ className: "bg-gray-100" }}
                  >
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarTrigger />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-200">
        <SidebarMenuButton asChild>
          {logoutConfirm ? (
            <div
              onClick={() => {
                window.localStorage.clear()
                window.location.href = "/"
              }}
              className="flex items-center gap-2 cursor-pointer !bg-red-500 !text-white hover:!bg-red-600 hover:!text-white w-full"
            >
              <LogOut />
              <span>Are you sure?</span>
            </div>
          ) : (
            <div onClick={() => setLogoutConfirm(true)} className="flex items-center gap-2 cursor-pointer">
              <LogOut />
              <span>Logout</span>
            </div>
          )}
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <Link
            to="/dashboard/company/$companyId/profile"
            params={{ companyId: companyId.toString() }}
            activeProps={{ className: "bg-gray-100" }}
          >
            <UserIcon />
            <span>Profile</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
