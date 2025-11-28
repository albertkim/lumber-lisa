import { User } from "@/models"
import { createMiddleware } from "@tanstack/react-start"

export const isAdminMiddleware = createMiddleware({ type: "function" }).server(async ({ next, context }) => {
  const contextData = context as unknown as { user?: User }

  if (!contextData.user) {
    throw Error("auth-middleware must be called before this middleware")
  }

  const user = contextData.user

  if (user.isAdmin) {
    return next()
  } else {
    throw Error("Unauthorized, user is not an admin")
  }
})
