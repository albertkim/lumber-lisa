import { UserService } from "@/server/services/UserService"
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
    return next({ context: { user } })
  } catch (error) {
    console.error(error)
    throw json({ message: "Unauthorized" }, { status: 401 })
  }
})
