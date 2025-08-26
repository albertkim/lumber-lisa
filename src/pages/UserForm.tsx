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
import { useEffect, useState } from "react"
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
  const { user, company, editUserId, onClose } = props
  const [editUser, setEditUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      userFullName: editUser?.userFullName || "",
      userEmail: editUser?.userEmail || ""
    } as UserFormValues,
    validators: {
      onSubmit: CreateUserSchema
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      if (editUserId) {
        try {
          const updatedUser = await updateCompanyUser({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: {
              companyId: company.companyId,
              userId: editUserId,
              userFullName: value.userFullName || ""
            }
          })
          toast.success("User updated")
          onClose()
        } catch (error) {
          setErrorMessage("Failed to update user")
        }
      } else {
        try {
          const createdUser = await createCompanyUser({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: {
              companyId: company.companyId,
              userFullName: value.userFullName || "",
              userEmail: value.userEmail
            }
          })
          toast.success("User created")
          onClose()
        } catch (error) {
          setErrorMessage("Failed to create user")
        }
      }
      setIsLoading(false)
    }
  })

  const formErrorMap = useStore(form.store, (state) => state.errorMap)

  useEffect(() => {
    const fetchUser = async () => {
      if (editUserId) {
        const user = await getCompanyUserById({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: {
            companyId: company.companyId,
            userId: editUserId
          }
        })
        if (user) {
          setEditUser(user)
          form.reset({
            userId: user.userId,
            userFullName: user.userFullName || "",
            userEmail: user.userEmail || ""
          })
        }
      }
    }
    fetchUser()
  }, [editUserId])

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

          <div className="text-red-500 text-sm">
            {errorMessage && <div>{errorMessage}</div>}
            {formErrorMap.onSubmit &&
              Object.values(formErrorMap.onSubmit).map((error, index) => <div key={index}>{error[0].message}</div>)}
          </div>

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
