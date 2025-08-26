import { createServerFn } from "@tanstack/react-start"
import { ResetPasswordSchema } from "../models/UserModel"
import { UserService } from "../services/UserService"

export const resetPassword = createServerFn({ method: "POST" })
  .validator(ResetPasswordSchema)
  .handler(async ({ data }) => {
    try {
      const { token, password } = data
      const user = await UserService.resetPassword(token, password)
      return { success: true, user }
    } catch (error) {
      console.error("Reset password error:", error)
      throw new Error("Failed to reset password. Please try again.")
    }
  })
