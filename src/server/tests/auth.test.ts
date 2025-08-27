import { describe, expect, it } from "vitest"
import { login } from "../server-functions/login"

describe("Auth", () => {
  it("Cannot log in with invalid credentials", async () => {
    expect(
      await login({
        data: {
          email: "test@test.com",
          password: "test"
        }
      })
    ).rejects.toThrow()
  })
})
