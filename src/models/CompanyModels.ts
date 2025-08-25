import { z } from "zod"
import { UserSchema } from "./UserModel"

// Schemas

const defaultMeasurementUnitSchema = z.enum(["ft", "m"])

export const LocationSchema = z.object({
  locationId: z.number(),
  locationName: z.string(),
  locationCompanyId: z.number(),
  locationCreateDate: z.string(),
  locationUpdateDate: z.string()
})

export const CreateLocationSchema = LocationSchema.pick({
  locationName: true,
  locationCompanyId: true
})

export const UpdateLocationSchema = LocationSchema.pick({
  locationId: true,
  locationCompanyId: true,
  locationName: true
}).partial()

export const CompanySchema = z.object({
  companyId: z.number(),
  companyName: z.string().min(1, "Company name is required"),
  companySubscriptionStatus: z.string(),
  companyDefaultMeasurementUnit: defaultMeasurementUnitSchema,
  companyIsDeleted: z.string().nullable(),
  companyCreateDate: z.string(),
  companyUpdateDate: z.string(),
  companyLocations: z.array(LocationSchema),
  companyIntegrations: z.object({
    lisa: z.boolean()
  })
})

export const UpdateCompanySchema = CompanySchema.pick({
  companyId: true,
  companyName: true,
  companyDefaultMeasurementUnit: true
}).partial({
  companyName: true,
  companyDefaultMeasurementUnit: true
})

export const CompanyUsersResponseSchema = z.object({
  data: z.array(UserSchema),
  total: z.number()
})

// Types

export type DefaultMeasurementUnit = z.infer<typeof defaultMeasurementUnitSchema>
export type Company = z.infer<typeof CompanySchema>
export type UpdateCompany = z.infer<typeof UpdateCompanySchema>
export type CreateLocation = z.infer<typeof CreateLocationSchema>
export type UpdateLocation = z.infer<typeof UpdateLocationSchema>
export type Location = z.infer<typeof LocationSchema>
export type CompanyUsersResponse = z.infer<typeof CompanyUsersResponseSchema>

// Responses

export type CompanyResponse = Company
export type UpdateCompanyResponse = Company
export type CreateLocationResponse = Location
export type UpdateLocationResponse = Location
