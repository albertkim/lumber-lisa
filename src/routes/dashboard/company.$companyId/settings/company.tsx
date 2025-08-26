import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UpdateCompanySchema } from "@/models"
import { updateCompany } from "@/server-functions/company-update"
import { useForm, useStore } from "@tanstack/react-form"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
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
  const { company } = Route.useRouteContext()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (!company) {
    return null
  }

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
      setIsLoading(true)
      try {
        await updateCompany({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: value
        })
        toast("Company updated")
      } catch (error: any) {
        setErrorMessage(error.message || "There was an error updating the company")
      }
      setIsLoading(false)
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

          <div className="text-red-500 text-sm">
            {errorMessage && <div>{errorMessage}</div>}
            {formErrorMap.onSubmit &&
              Object.values(formErrorMap.onSubmit).map((error, index) => <div key={index}>{error[0].message}</div>)}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}
