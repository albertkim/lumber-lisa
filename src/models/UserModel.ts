import { z } from "zod"

// Schemas

export const UserSchema = z.object({
  userId: z.number(),
  userFullName: z.string().nullable(),
  userEmail: z.string(),
  isAdmin: z.boolean(),
  securityRoleId: z.number(),
  company: z.object({
    companyId: z.number(),
    companyName: z.string()
  })
})

export const CreateUserSchema = UserSchema.pick({
  userFullName: true,
  userEmail: true
}).extend({
  userFullName: z.string().min(1, "Name cannot be empty"),
  userEmail: z.string().min(1, "Email cannot be empty")
})

export const UpdateUserSchema = UserSchema.pick({
  userId: true,
  userFullName: true
})

export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, "Email cannot be empty")
    .transform((val) => val.toLowerCase()),
  password: z.string().min(1, "Password cannot be empty")
})

export const LoginResponseSchema = z.object({
  token: z.string(),
  user: UserSchema
})

export const RequestForgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, "Email cannot be empty")
    .transform((val) => val.toLowerCase())
})

export const ResetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
    token: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })

// Types

export type Login = z.infer<typeof LoginSchema>
export type User = z.infer<typeof UserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type RequestForgotPassword = z.infer<typeof RequestForgotPasswordSchema>
export type ResetPassword = z.infer<typeof ResetPasswordSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>

// Responses

export type AuthResponse = User

export type LoginResponse = z.infer<typeof LoginResponseSchema>

export type UpdateUserResponse = User
