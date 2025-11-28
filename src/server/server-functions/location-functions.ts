import { CreateLocationSchema, UpdateLocationSchema } from "@/models"
import { CompanyService } from "@/server/services/CompanyService"
import { LocationService } from "@/server/services/LocationService"
import { createServerFn } from "@tanstack/react-start"
import z from "zod"
import { authMiddleware } from "./middleware/auth-middleware"
import { userBelongsToCompanyMiddleware } from "./middleware/belongs-to-company-middleware"

export const getLocations = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .inputValidator(z.object({ companyId: z.number() }))
  .handler(async ({ data, context }) => {
    const companyId = data.companyId
    const company = await CompanyService.getCompanyById(companyId)
    const locations = await LocationService.getLocations(companyId)
    return {
      data: locations,
      length: locations.length
    }
  })

export const createLocation = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .inputValidator(CreateLocationSchema)
  .handler(async ({ data, context }) => {
    const createLocation = CreateLocationSchema.parse(data)
    const createdLocation = await LocationService.createLocation(createLocation)
    return createdLocation
  })

export const updateLocation = createServerFn({ method: "POST" })
  .middleware([authMiddleware, userBelongsToCompanyMiddleware])
  .inputValidator(UpdateLocationSchema)
  .handler(async ({ data, context }) => {
    const updateLocation = UpdateLocationSchema.parse(data)
    const updatedLocation = await LocationService.updateLocation(updateLocation)
    return updatedLocation
  })
