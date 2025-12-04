import { UserService } from "@/server/services/UserService"
import { CompanyService } from "@/server/services/CompanyService"
import { createMiddleware, json } from "@tanstack/react-start"
import { getRequestHeader } from "@tanstack/react-start/server"

export const authMiddleware = createMiddleware({ type: "function" }).server(async ({ next, data }) => {
  try {
    const token = getRequestHeader("Authorization")
    if (!token) {
      throw json({ message: "Unauthorized, no Authorization header provided" }, { status: 401 })
    }
    const cleanToken = token.replace("Bearer ", "")
    const user = await UserService.getAuthUser(cleanToken)
    if (!user) {
      throw json({ message: "Unauthorized" }, { status: 401 })
    }
    const company = await CompanyService.getCompanyById(user.company.companyId)
    return next({ context: { user, company } })
  } catch (error) {
    console.error(error)
    throw json({ message: "Unauthorized" }, { status: 401 })
  }
})

export const authRequestMiddleware = createMiddleware({ type: "request" }).server(async ({ next, request }) => {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader) {
      throw json({ message: "Unauthorized, no Authorization header provided" }, { status: 401 })
    }
    const cleanToken = authHeader.replace("Bearer ", "")
    const user = await UserService.getAuthUser(cleanToken)
    if (!user) {
      throw json({ message: "Unauthorized" }, { status: 401 })
    }
    const company = await CompanyService.getCompanyById(user.company.companyId)
    return next({ context: { user, company } })
  } catch (error) {
    console.error(error)
    throw json({ message: "Unauthorized" }, { status: 401 })
  }
})
