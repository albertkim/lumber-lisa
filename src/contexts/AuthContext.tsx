import { Company } from "@/models/CompanyModels"
import { User } from "@/models/UserModel"
import { getCompany } from "@/server/server-functions/company-get"
import { getCurrentUser } from "@/server/server-functions/get-current-user"
import { useLocation, useParams, useRouter } from "@tanstack/react-router"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: User
  company: Company
  login: (token: string) => Promise<void>
  logout: () => void
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const location = useLocation()
  const params = useParams({ strict: false })

  // The user may also land on just /dashboard, which doesn't have a companyId param
  const routeCompanyId = params.companyId as string | undefined

  const fetchUserAndCompany = async (token: string) => {
    try {
      setIsLoading(true)

      const userData = await getCurrentUser({
        headers: { Authorization: `Bearer ${token}` }
      })

      const companyData = await getCompany({
        headers: { Authorization: `Bearer ${token}` },
        data: {
          companyId: routeCompanyId ? parseInt(routeCompanyId) : userData.company.companyId
        }
      })

      setUser(userData)
      setCompany(companyData)
    } catch (error) {
      if (error instanceof Error && error.message.includes("Unauthorized")) {
        logout()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (token: string) => {
    localStorage.setItem("token", token)
    await fetchUserAndCompany(token)
  }

  const logout = () => {
    console.log("Logging out")
    localStorage.removeItem("token")
    setUser(null)
    setCompany(null)
    setIsLoading(false)
  }

  const refetch = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      await fetchUserAndCompany(token)
    }
  }

  // Auto-load on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUserAndCompany(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  // Handle dashboard redirect after data is loaded
  useEffect(() => {
    if (!isLoading && user && company && location.pathname === "/dashboard") {
      router.navigate({
        to: "/dashboard/company/$companyId/home",
        params: { companyId: company.companyId.toString() }
      })
    }
  }, [isLoading, user, company, location.pathname, router])

  // Don't render children until we have user and company data
  if (isLoading || !user || !company) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        login,
        logout,
        refetch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
