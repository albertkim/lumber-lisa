import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RequestForgotPasswordSchema } from "@/models/UserModel"
import { resetPasswordRequest } from "@/server-functions.ts/reset-password-request"
import { useForm, useStore } from "@tanstack/react-form"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword
})

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      email: ""
    },
    validators: {
      onSubmit: RequestForgotPasswordSchema
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        await resetPasswordRequest({ data: { email: value.email } })
        setSuccess(true)
      } catch (error) {
        console.error("Password reset request failed:", error)
        setErrorMessage("An error occurred while processing your request. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  })

  const formErrorMap = useStore(form.store, (state) => state.errorMap)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Reset Password</h2>
        </div>
        {success ? (
          <div className="mt-8 space-y-6">
            <p className="text-center text-gray-500">
              If an account exists with this email, a reset link has been sent.
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
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <form.Field
                name="email"
                children={(field) => (
                  <Input
                    type="email"
                    required
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full"
                  />
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-red-500 text-sm">
              {errorMessage && <div>{errorMessage}</div>}
              {formErrorMap.onSubmit &&
                Object.values(formErrorMap.onSubmit).map((error, index) => <div key={index}>{error[0].message}</div>)}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
