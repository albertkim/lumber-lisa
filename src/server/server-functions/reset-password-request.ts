import { ActivityLogService } from "@/services/ActivityLogService"
import { createServerFn } from "@tanstack/react-start"
import { UserService } from "../services/UserService"

export const resetPasswordRequest = createServerFn({ method: "POST" })
  .validator((d: { email: string }) => d)
  .handler(async ({ data }) => {
    try {
      const { email } = data
      const user = await UserService.getUserByEmail(email)
      if (!user) {
        throw new Error("User not found")
      }
      await UserService.createResetPasswordTokenAndSendEmail(user)
      await ActivityLogService.createActivityLog({
        companyId: user.company.companyId,
        userId: user.userId,
        userFullName: user.userFullName ?? null,
        userEmail: user.userEmail ?? null,
        action: "create",
        type: "user",
        title: "User requested password reset",
        description: `User ${user.userEmail} requested password reset`,
        data: user
      })
      return { status: "done" }
    } catch (error) {
      console.error(error)
      // Don't reveal any errors to the user
      return { status: "done" }
    }
  })
