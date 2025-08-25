import { z } from "zod"
import { CompanySchema } from "./CompanyModels"
import { User, UserSchema } from "./UserModel"

// Schemas

export const AdminRegisterNewCompanySchema = z.object({
  companyName: z.string().trim().min(1, "Company name cannot be empty"),
  companySubscriptionStatus: z.string(),
  userEmail: z
    .string()
    .trim()
    .email()
    .min(3, "Email cannot be empty")
    .transform((val) => val.toLowerCase()),
  userFullName: z.string().trim().min(1, "Full name cannot be empty"),
  userPassword: z.string().nullable()
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
  user: UserSchema
})

export type AdminRegisterNewCompanyResponse = z.infer<typeof AdminRegisterNewCompanyResponseSchema>

// Types

export type AdminRegisterNewCompany = z.infer<typeof AdminRegisterNewCompanySchema>

// Responses

export type AdminUsersResponse = {
  data: User[]
  total: number
}

export type AdminUserResponse = User
