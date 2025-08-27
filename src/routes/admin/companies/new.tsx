import { ErrorDisplay } from "@/components/ErrorDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminRegisterNewCompany, AdminRegisterNewCompanySchema } from "@/models"
import { registerNewCompany } from "@/server/server-functions/admin-functions"
import { useForm, useStore } from "@tanstack/react-form"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/companies/new")({
  component: RouteComponent
})

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showInitialUser, setShowInitialUser] = useState(false)
  const navigate = useNavigate()

  const defaultValues: AdminRegisterNewCompany = {
    companyName: "",
    companySubscriptionStatus: "paid",
    initialUser: null
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: AdminRegisterNewCompanySchema
    },
    onSubmit: async ({ value }) => {
      if (!confirm("Are you sure you want to create this company?")) {
        return
      }
      setIsLoading(true)
      if (value.initialUser && !value.initialUser.userPassword) {
        value.initialUser.userPassword = null
      }
      try {
        await registerNewCompany({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: value
        })
        toast.success("Company created")
        navigate({ to: "/admin/companies" })
      } catch (error) {
        toast.error("Failed to create company")
        console.error(error)
      }
      setIsLoading(false)
    }
  })

  const formErrorMap = useStore(form.store, (state) => state.errorMap)

  return (
    <div className="max-w-md">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <form.Field
            name="companyName"
            children={(field) => (
              <Input value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowInitialUser(!showInitialUser)
                if (!showInitialUser) {
                  form.setFieldValue("initialUser", {
                    userEmail: "",
                    userFullName: "",
                    userPassword: ""
                  })
                } else {
                  form.setFieldValue("initialUser", null)
                }
              }}
            >
              {showInitialUser ? "Remove initial user" : "Add initial user"}
            </Button>
          </div>

          {showInitialUser && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <form.Field
                  name="initialUser.userEmail"
                  children={(field) => (
                    <Input value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} />
                  )}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <form.Field
                  name="initialUser.userFullName"
                  children={(field) => (
                    <Input value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} />
                  )}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <form.Field
                  name="initialUser.userPassword"
                  children={(field) => (
                    <Input value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} />
                  )}
                />
              </div>
            </>
          )}

          <div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>

        <ErrorDisplay error={errorMessage} formOnSubmitError={formErrorMap.onSubmit} />
      </form>
    </div>
  )
}
