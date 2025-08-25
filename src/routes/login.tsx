import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { LoginResponseSchema, LoginSchema, User } from "../models/UserModel"
import { getCurrentUser } from "../server-functions.ts/get-current-user"
import { login } from "../server-functions.ts/login"

export const Route = createFileRoute("/login")({
  component: Login
})

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: LoginSchema
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      setIsLoading(true)
      try {
        const result = await login({
          data: {
            email: value.email,
            password: value.password
          }
        })
        LoginResponseSchema.parse(result)
        // Note: You'll need to handle token storage based on your auth setup
        // For now, we'll just redirect to home
        window.location.href = "/"
      } catch (error) {
        if (error instanceof Error) {
          setServerError(error.message || "Invalid credentials")
        } else {
          setServerError("An unexpected error occurred")
        }
      } finally {
        setIsLoading(false)
      }
    }
  })

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const user = await getCurrentUser()
        setAuthUser(user)
      } catch (error) {
        // User is not authenticated, which is expected for login page
        console.log("User not authenticated")
      }
    }
    fetchAuthUser()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Log in</h2>
        </div>
        {authUser && (
          <div>
            <Button
              className="w-full"
              onClick={() =>
                navigate({
                  to: "/"
                })
              }
            >
              Go to Dashboard
            </Button>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <form.Field
              name="email"
              children={(field) => (
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <form.Field
              name="password"
              children={(field) => (
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full"
                />
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </Button>

          <div className="text-red-500 text-sm">{serverError && <div>{serverError}</div>}</div>

          <div>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
