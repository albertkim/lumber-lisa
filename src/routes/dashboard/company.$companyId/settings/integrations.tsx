import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Integrations, UpdateIntegrationsSchema } from "@/models"
import { getIntegrations, updateIntegrations } from "@/server/server-functions/integration-functions"
import { useForm, useStore } from "@tanstack/react-form"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const Route = createFileRoute("/dashboard/company/$companyId/settings/integrations")({
  component: RouteComponent
})

function RouteComponent() {
  const { user, company } = Route.useRouteContext()
  const [integrations, setIntegrations] = useState<Integrations | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const form = useForm({
    defaultValues: {
      companyId: company.companyId,
      lisa: integrations?.lisa || null
    },
    validators: {
      onSubmit: UpdateIntegrationsSchema
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      const data = values.value

      // Convert any empty strings to null in lisa object
      if (data.lisa) {
        Object.keys(data.lisa).forEach((key) => {
          if (data.lisa![key as keyof typeof data.lisa] === "") {
            data.lisa![key as keyof typeof data.lisa] = null as any
          }
        })
      }

      try {
        const response = await updateIntegrations({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: {
            ...data
          }
        })

        setIntegrations(response)
        toast("Integration settings updated successfully")
        await fetchIntegrations()
        setIsExpanded(false)
      } catch (error) {
        toast("Failed to update integration settings")
      }
      setIsLoading(false)
    }
  })

  const fetchIntegrations = async () => {
    try {
      const response = await getIntegrations({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: {
          companyId: company.companyId
        }
      })
      setIntegrations(response)
    } catch (error) {
      console.error("Failed to fetch integrations:", error)
    }
  }

  useEffect(() => {
    fetchIntegrations()
  }, [company])

  const disableLisa = () => {
    form.reset({
      companyId: company.companyId,
      lisa: null
    })
    form.handleSubmit()
  }

  const isLisaConfigured = integrations ? !!integrations.lisa : null
  const formErrorMap = useStore(form.store, (state) => state.errorMap)

  return (
    <div className="max-w-md">
      <h2 className="font-bold mb-4">Integrations</h2>
      <Card className="cursor-pointer" onClick={() => !isExpanded && setIsExpanded(true)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLisaConfigured === null ? "bg-gray-500" : isLisaConfigured ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <div className="text-gray-500">
              LISA: {isLisaConfigured === null ? "loading..." : isLisaConfigured ? "enabled" : "disabled"}
            </div>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Database host</label>
                  <form.Field
                    name="lisa.databaseHost"
                    children={(field) => (
                      <Input value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Database username</label>
                  <form.Field
                    name="lisa.databaseUsername"
                    children={(field) => (
                      <Input value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Database password</label>
                  <form.Field
                    name="lisa.databasePassword"
                    children={(field) => (
                      <Input value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Database name</label>
                  <form.Field
                    name="lisa.databaseName"
                    children={(field) => (
                      <Input value={field.state.value || ""} onChange={(e) => field.handleChange(e.target.value)} />
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    disableLisa()
                    form.reset()
                  }}
                >
                  Disable
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsExpanded(false)
                    form.reset()
                  }}
                >
                  Cancel
                </Button>
              </div>

              {formErrorMap.onSubmit && (
                <div className="text-red-500 text-sm">
                  {Object.values(formErrorMap.onSubmit).map((error) => (
                    <div key={error[0].message}>{error[0].message}</div>
                  ))}
                </div>
              )}
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
