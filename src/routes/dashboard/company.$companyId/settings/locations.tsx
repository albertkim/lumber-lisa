import { ErrorDisplay } from "@/components/ErrorDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { CreateLocation, CreateLocationSchema, Location, UpdateLocation } from "@/models"
import { createLocation, getLocations, updateLocation } from "@/server/server-functions/location-functions"
import { useForm, useStore } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import dayjs from "dayjs"
import { useState } from "react"
import { toast } from "sonner"

export const Route = createFileRoute("/dashboard/company/$companyId/settings/locations")({
  component: LocationsComponent
})

function LocationsComponent() {
  const { company } = useAuth()
  const [editLocation, setEditLocation] = useState<Location | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: locations,
    isPending: isLoadingLocations,
    error: locationsError
  } = useQuery({
    queryKey: ["locations", company.companyId],
    queryFn: async () => {
      return await getLocations({
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
    mutate: createLocationMutation,
    isPending: isCreatingLocation,
    error: createLocationError
  } = useMutation({
    mutationFn: async (data: CreateLocation) => {
      return await createLocation({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: {
          locationName: data.locationName,
          locationCompanyId: company.companyId
        }
      })
    },
    onSuccess: () => {
      toast.success("Location created")
      queryClient.invalidateQueries({ queryKey: ["locations", company.companyId] })
      setIsSheetOpen(false)
    }
  })

  const {
    mutate: updateLocationMutation,
    isPending: isUpdatingLocation,
    error: updateLocationError
  } = useMutation({
    mutationFn: async (data: UpdateLocation) => {
      return await updateLocation({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data
      })
    },
    onSuccess: () => {
      toast.success("Location updated")
      queryClient.invalidateQueries({ queryKey: ["locations", company.companyId] })
      setIsSheetOpen(false)
    }
  })

  const form = useForm({
    defaultValues: {
      locationName: editLocation?.locationName || "",
      locationCompanyId: editLocation?.locationCompanyId || company!.companyId
    },
    validators: {
      onSubmit: CreateLocationSchema
    },
    onSubmit: async ({ value }) => {
      if (editLocation) {
        updateLocationMutation({
          locationId: editLocation.locationId,
          locationName: value.locationName,
          locationCompanyId: company!.companyId
        })
      } else {
        createLocationMutation(value)
      }
    }
  })

  const isLoading = isCreatingLocation || isUpdatingLocation

  const formErrorMap = useStore(form.store, (state) => state.errorMap)

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
          {locations?.data.map((location) => (
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

            <ErrorDisplay
              error={createLocationError?.message || updateLocationError?.message}
              formOnSubmitError={formErrorMap.onSubmit}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
