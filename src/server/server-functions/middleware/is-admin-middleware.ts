import { User } from "@/models"
import { createMiddleware } from "@tanstack/react-start"
import { createError } from "@tanstack/react-start/server"

export const isAdminMiddleware = createMiddleware({ type: "function" }).server(async ({ next, context }) => {
  const contextData = context as unknown as { user?: User }

  if (!contextData.user) {
    throw createError({
      status: 403,
      message: "auth-middleware must be called before this middleware"
    })
  }

  const user = contextData.user

  if (user.isAdmin) {
    return next()
  } else {
    throw createError({
      status: 403,
      message: "Unauthorized, user is not an admin"
    })
  }
})
