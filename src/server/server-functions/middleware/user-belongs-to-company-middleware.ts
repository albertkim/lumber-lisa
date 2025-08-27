import { User } from "@/models"
import { createMiddleware } from "@tanstack/react-start"
import { createError } from "@tanstack/react-start/server"

export const userBelongsToCompanyMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next, context, data }) => {
    const contextData = context as unknown as { user?: User }

    if (!contextData.user) {
      throw createError({
        status: 403,
        message: "auth-middleware must be called before this middleware"
      })
    }

    const user = contextData.user

    // Admins can access any company
    if (user.isAdmin) {
      return next()
    }

    const bodyData = data as unknown as { companyId: number }

    if (!bodyData.companyId) {
      throw createError({
        status: 400,
        message: "No company ID provided"
      })
    }

    const companyId = bodyData.companyId

    if (user.company.companyId !== companyId) {
      throw createError({
        status: 403,
        message: "Unauthorized, user does not belong to company"
      })
    }

    return next()
  }
)
