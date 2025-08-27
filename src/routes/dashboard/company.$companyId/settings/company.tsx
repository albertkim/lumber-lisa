import { ErrorDisplay } from "@/components/ErrorDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { UpdateCompanySchema } from "@/models"
import { updateCompany } from "@/server/server-functions/company-update"
import { useForm, useStore } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"

export const Route = createFileRoute("/dashboard/company/$companyId/settings/company")({
  component: RouteComponent
})

type CompanyFormValues = {
  companyId: number
  companyName?: string
  companyDefaultMeasurementUnit?: "ft" | "m"
}

function RouteComponent() {
  const { company, refetch } = useAuth()

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: CompanyFormValues) => {
      return await updateCompany({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data
      })
    },
    onSuccess: () => {
      refetch()
      toast("Company updated")
    }
  })

  const form = useForm({
    defaultValues: {
      companyId: company.companyId,
      companyName: company.companyName || "",
      companyDefaultMeasurementUnit: company.companyDefaultMeasurementUnit || "ft"
    } as CompanyFormValues,
    validators: {
      onSubmit: UpdateCompanySchema
    },
    onSubmit: async ({ value }) => {
      mutate(value)
    }
  })

  const formErrorMap = useStore(form.store, (state) => state.errorMap)

  return (
    <div className="max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <form.Field
              name="companyName"
              children={(field) => (
                <Input
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Default Measurement Unit</label>
            <form.Field
              name="companyDefaultMeasurementUnit"
              children={(field) => (
                <Select
                  onValueChange={(value) => field.handleChange(value as "ft" | "m")}
                  defaultValue={field.state.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ft">Feet</SelectItem>
                    <SelectItem value="m">Meters</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <ErrorDisplay
            error={error && (error.message || "There was an error updating the company")}
            formOnSubmitError={formErrorMap.onSubmit}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}
