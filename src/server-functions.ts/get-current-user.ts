import { createServerFn } from "@tanstack/react-start"
import { authMiddleware } from "./middleware/auth-middleware"

export const getCurrentUser = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return context.user
  })
