import { z } from "zod"
import { CompanySchema } from "./CompanyModels"
import { UserSchema } from "./UserModel"

// Schemas

export const AdminRegisterNewCompanySchema = z.object({
  companyName: z.string().trim().min(1, "Company name cannot be empty"),
  companySubscriptionStatus: z.string(),
  initialUser: z
    .object({
      userEmail: z
        .string()
        .trim()
        .min(3, "Email cannot be empty")
        .transform((val) => val.toLowerCase()),
      userFullName: z.string().trim().min(1, "Full name cannot be empty"),
      userPassword: z.string().nullable()
    })
    .nullable()
})

export const AdminUsersSchema = z.object({
  data: z.array(UserSchema),
  total: z.number()
})

export const AdminCompaniesSchema = z.object({
  data: z.array(CompanySchema),
  total: z.number()
})

export const AdminRegisterNewCompanyResponseSchema = z.object({
  company: CompanySchema,
  user: UserSchema.nullable()
})

export type AdminRegisterNewCompanyResponse = z.infer<typeof AdminRegisterNewCompanyResponseSchema>

// Types

export type AdminRegisterNewCompany = z.infer<typeof AdminRegisterNewCompanySchema>

// Responses

export const AdminCompanyWithDetailsSchema = CompanySchema.extend({
  users: z.array(UserSchema)
})

export const AdminCompaniesWithDetailsSchema = z.object({
  data: z.array(AdminCompanyWithDetailsSchema),
  total: z.number()
})

export type AdminCompanyWithDetails = z.infer<typeof AdminCompanyWithDetailsSchema>
export type AdminCompaniesWithDetailsResponse = z.infer<typeof AdminCompaniesWithDetailsSchema>
