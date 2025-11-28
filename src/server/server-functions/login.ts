import { createServerFn } from "@tanstack/react-start"
import { UserService } from "../services/UserService"

export const login = createServerFn({ method: "POST" })
  .inputValidator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    const { email, password } = data
    const userWithToken = await UserService.login({ email, password })
    return userWithToken
  })
