import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCurrentUser } from "@/server/server-functions/get-current-user"
import { login } from "@/server/server-functions/login"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { LoginResponseSchema, LoginSchema } from "../models/UserModel"

export const Route = createFileRoute("/login")({
  component: Login
})

export function Login() {
  const { data: authUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = window.localStorage.getItem("token")
      if (!token) return null
      return await getCurrentUser({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    retry: false
  })

  const {
    mutate: loginMutation,
    isPending: isLoggingIn,
    error: loginError
  } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const result = await login({ data })
      LoginResponseSchema.parse(result)
      return result
    },
    onSuccess: (result) => {
      window.localStorage.setItem("token", result.token)
      if (result.user.isAdmin) {
        window.location.href = "/admin"
      } else {
        window.location.href = "/dashboard"
      }
    }
  })

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: LoginSchema
    },
    onSubmit: async ({ value }) => {
      loginMutation(value)
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Log in</h2>
        </div>
        {authUser && (
          <div>
            {authUser.isAdmin ? (
              <Link to="/admin">
                <Button className="w-full bg-blue-500 text-white">Go to Admin</Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button className="w-full bg-blue-500 text-white">Go to Dashboard</Button>
              </Link>
            )}
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

          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Log in"}
          </Button>

          <div className="text-red-500 text-sm">
            {loginError && <div>{loginError.message || "Invalid credentials"}</div>}
          </div>

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
