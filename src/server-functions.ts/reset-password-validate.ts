import { createServerFn } from "@tanstack/react-start"
import { UserService } from "../services/UserService"

export const resetPasswordValidate = createServerFn({ method: "POST" })
  .validator((d: { token: string }) => d)
  .handler(async ({ data }) => {
    const { token } = data
    const isValid = await UserService.validateResetPasswordToken(token)
    return { isValid }
  })
