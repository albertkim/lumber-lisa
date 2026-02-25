import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { getInventoryGroups } from "@/server/server-functions/report-functions"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLocation, useNavigate } from "@tanstack/react-router"

const reportsRouteApi = getRouteApi("/dashboard/company/$companyId/reports")

export function InventoryGroupFilterButton() {
  const { company } = useAuth()
  const { inventoryGroupId } = reportsRouteApi.useSearch()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: inventoryGroupsResponse, isPending: isLoadingInventoryGroups } = useQuery({
    queryKey: ["report-inventory-groups", company.companyId],
    queryFn: async () =>
      getInventoryGroups({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: { companyId: company.companyId }
      })
  })

  const inventoryGroups = inventoryGroupsResponse?.data ?? []

  return (
    <div className="min-w-[220px]">
      <Select
        value={inventoryGroupId || "__all__"}
        onValueChange={(value) => {
          navigate({
            to: location.pathname,
            search: (previous) => ({
              ...previous,
              inventoryGroupId: value === "__all__" ? undefined : value
            })
          })
        }}
        disabled={isLoadingInventoryGroups}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All inventory groups" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All inventory groups</SelectItem>
          {inventoryGroups.map((group) => (
            <SelectItem key={group.inventoryGroupId} value={group.inventoryGroupId}>
              {group.inventoryGroupName ? `${group.inventoryGroupName} (${group.inventoryGroupId})` : group.inventoryGroupId}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
