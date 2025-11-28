import { ResetPasswordSchema } from "@/models"
import { UserService } from "@/server/services/UserService"
import { createServerFn } from "@tanstack/react-start"

export const resetPassword = createServerFn({ method: "POST" })
  .inputValidator(ResetPasswordSchema)
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
