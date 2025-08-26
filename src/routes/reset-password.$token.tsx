import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResetPasswordSchema } from "@/models"
import { resetPassword } from "@/server/server-functions/reset-password"
import { resetPasswordValidate } from "@/server/server-functions/reset-password-validate"
import { useForm } from "@tanstack/react-form"
import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/reset-password/$token")({
  component: ResetPassword
})

function ResetPassword() {
  const { token } = Route.useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      try {
        const result = await resetPasswordValidate({ data: { token } })
        setIsTokenValid(result.isValid)
      } catch (error) {
        console.error("Token validation error:", error)
        setIsTokenValid(false)
      }
    }
    validateToken()
  }, [token])

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: token
    },
    validators: {
      onSubmit: ResetPasswordSchema
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        await resetPassword({ data: value })
        setSuccess(true)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Reset Password</h2>
        </div>

        {isTokenValid === null ? (
          <div className="mt-8 space-y-6">
            <p className="text-gray-500">Validating reset token...</p>
          </div>
        ) : !isTokenValid ? (
          <div className="mt-8 space-y-6">
            <p className="text-red-500">
              This password reset link is invalid or has expired. You can request a new one{" "}
              <Link to="/forgot-password" className="underline">
                here
              </Link>
              .
            </p>
            <p>
              <Link to="/login" className="underline">
                Login
              </Link>
            </p>
          </div>
        ) : success ? (
          <div className="mt-8 space-y-6">
            <p className="text-center text-gray-500">
              Password reset successfully. You can now{" "}
              <Link to="/login" className="underline">
                login
              </Link>
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <form.Field
                name="password"
                children={(field) => (
                  <Input
                    type="password"
                    required
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <form.Field
                name="confirmPassword"
                children={(field) => (
                  <Input
                    type="password"
                    required
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full"
                  />
                )}
              />
            </div>

            <div className="text-red-500 text-sm">{errorMessage && <div>{errorMessage}</div>}</div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
