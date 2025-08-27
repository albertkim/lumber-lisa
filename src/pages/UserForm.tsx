import { ErrorDisplay } from "@/components/ErrorDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Company, CreateUserSchema, User } from "@/models"
import {
  createCompanyUser,
  getCompanyUserById,
  updateCompanyUser
} from "@/server/server-functions/company-user-functions"
import { useForm, useStore } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface Props {
  user: User
  company: Company
  editUserId: number | null
  onClose: () => void
}

type UserFormValues = {
  userId?: number
  userFullName: string
  userEmail: string
}

export function UserForm(props: Props) {
  const { company, editUserId, onClose } = props
  const queryClient = useQueryClient()

  const { data: editUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", editUserId],
    queryFn: async () => {
      if (!editUserId) return null
      return await getCompanyUserById({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { companyId: company.companyId, userId: editUserId }
      })
    },
    enabled: !!editUserId
  })

  const {
    mutate: createUserMutation,
    isPending: isCreatingUser,
    error: createUserError
  } = useMutation({
    mutationFn: async (data: { userFullName: string; userEmail: string }) => {
      return await createCompanyUser({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { companyId: company.companyId, ...data }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", company.companyId] })
      toast.success("User created")
      onClose()
    }
  })

  const {
    mutate: updateUserMutation,
    isPending: isUpdatingUser,
    error: updateUserError
  } = useMutation({
    mutationFn: async (data: { userFullName: string }) => {
      if (!editUserId) throw new Error("No user ID")
      return await updateCompanyUser({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { companyId: company.companyId, userId: editUserId, ...data }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", company.companyId] })
      queryClient.invalidateQueries({ queryKey: ["user", editUserId, company.companyId] })
      toast.success("User updated")
      onClose()
    }
  })

  const form = useForm({
    defaultValues: {
      userFullName: editUser?.userFullName || "",
      userEmail: editUser?.userEmail || ""
    } as UserFormValues,
    validators: {
      onSubmit: CreateUserSchema
    },
    onSubmit: async ({ value }) => {
      if (editUserId) {
        updateUserMutation({ userFullName: value.userFullName || "" })
      } else {
        createUserMutation({
          userFullName: value.userFullName || "",
          userEmail: value.userEmail
        })
      }
    }
  })

  const isLoading = isCreatingUser || isUpdatingUser
  const formErrorMap = useStore(form.store, (state) => state.errorMap)
  const errorMessage = createUserError?.message || updateUserError?.message

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent
        className="sm:max-w-[600px]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <SheetHeader className="mb-4">
          <SheetTitle>{editUserId ? "Edit User" : "Add New User"}</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4 px-4"
        >
          {editUserId ? (
            <Input type="email" value={editUser?.userEmail || ""} disabled={true} />
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <form.Field
                name="userEmail"
                children={(field) => (
                  <Input
                    type="email"
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full"
                  />
                )}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <form.Field
              name="userFullName"
              children={(field) => (
                <Input
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full"
                />
              )}
            />
          </div>

          <ErrorDisplay error={errorMessage} formOnSubmitError={formErrorMap.onSubmit} />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
