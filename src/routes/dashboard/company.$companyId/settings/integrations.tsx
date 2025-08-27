import { ErrorDisplay } from "@/components/ErrorDisplay"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { UpdateIntegrationsSchema } from "@/models"
import { getIntegrations, updateIntegrations } from "@/server/server-functions/integration-functions"
import { useForm, useStore } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"

export const Route = createFileRoute("/dashboard/company/$companyId/settings/integrations")({
  component: RouteComponent
})

function RouteComponent() {
  const { company } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: integrations,
    isPending: isLoadingIntegrations,
    error: integrationsError
  } = useQuery({
    queryKey: ["integrations", company.companyId],
    queryFn: async () => {
      return await getIntegrations({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: {
          companyId: company.companyId
        }
      })
    }
  })

  const {
    mutate: updateIntegrationsMutation,
    isPending: isUpdatingIntegrations,
    error: updateIntegrationsError
  } = useMutation({
    mutationFn: async (data: { companyId: number; lisa: any }) => {
      // Convert any empty strings to null in lisa object
      if (data.lisa) {
        Object.keys(data.lisa).forEach((key) => {
          if (data.lisa![key as keyof typeof data.lisa] === "") {
            data.lisa![key as keyof typeof data.lisa] = null as any
          }
        })
      }

      return await updateIntegrations({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data
      })
    },
    onSuccess: () => {
      toast("Integration settings updated successfully")
      queryClient.invalidateQueries({ queryKey: ["integrations", company.companyId] })
      setIsExpanded(false)
    },
    onError: () => {
      toast("Failed to update integration settings")
    }
  })

  const form = useForm({
    defaultValues: {
      companyId: company.companyId,
      lisa: integrations?.lisa || null
    },
    validators: {
      onSubmit: UpdateIntegrationsSchema
    },
    onSubmit: async ({ value }) => {
      updateIntegrationsMutation(value)
    }
  })

  const disableLisa = () => {
    updateIntegrationsMutation({
      companyId: company.companyId,
      lisa: null
    })
  }

  const isLisaConfigured = integrations ? !!integrations.lisa : null
  const isLoading = isUpdatingIntegrations
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

              <ErrorDisplay error={integrationsError?.message} formOnSubmitError={formErrorMap.onSubmit} />
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
