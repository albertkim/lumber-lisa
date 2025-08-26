import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateLocationSchema, Location } from "@/models"
import { createLocation, getLocations, updateLocation } from "@/server/server-functions/location-functions"
import { useForm, useStore } from "@tanstack/react-form"
import { createFileRoute } from "@tanstack/react-router"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const Route = createFileRoute("/dashboard/company/$companyId/settings/locations")({
  component: LocationsComponent
})

function LocationsComponent() {
  const { company } = Route.useRouteContext()
  const [locations, setLocations] = useState<Location[] | null>(null)
  const [editLocation, setEditLocation] = useState<Location | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      locationName: editLocation?.locationName || "",
      locationCompanyId: editLocation?.locationCompanyId || company!.companyId
    },
    validators: {
      onSubmit: CreateLocationSchema
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      if (editLocation) {
        try {
          await updateLocation({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: {
              locationId: editLocation.locationId,
              locationName: value.locationName,
              locationCompanyId: company!.companyId
            }
          })
          toast("Location updated")
          setIsSheetOpen(false)
          fetchLocations()
        } catch (error) {
          setErrorMessage("Failed to update location")
        }
      } else {
        try {
          await createLocation({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: value
          })
          toast("Location created")
          fetchLocations()
        } catch (error) {
          setErrorMessage("Failed to create location")
        }
      }
      setIsLoading(false)
    }
  })

  const formErrorMap = useStore(form.store, (state) => state.errorMap)

  const fetchLocations = async () => {
    const fetchedLocations = await getLocations({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        companyId: company.companyId
      }
    })
    setLocations(fetchedLocations.data)
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  const handleEdit = (location: Location) => {
    setEditLocation(location)
    form.reset(location)
    setIsSheetOpen(true)
  }

  const handleAdd = () => {
    setEditLocation(null)
    form.reset({
      locationName: "",
      locationCompanyId: company!.companyId
    })
    setIsSheetOpen(true)
  }

  return (
    <div>
      <Button className="mb-4" onClick={handleAdd}>
        Add location
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations?.map((location) => (
            <TableRow key={location.locationId}>
              <TableCell>{location.locationName}</TableCell>
              <TableCell>{dayjs(location.locationCreateDate).format("MMM DD, YYYY")}</TableCell>
              <TableCell>
                <Button variant="link" onClick={() => handleEdit(location)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editLocation ? "Edit" : "Add"} location</SheetTitle>
          </SheetHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="space-y-4 px-4"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <form.Field
                name="locationName"
                children={(field) => (
                  <Input
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full"
                  />
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
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
