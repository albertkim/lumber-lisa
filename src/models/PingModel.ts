import { z } from "zod"

// Schemas

export const PingSchema = z.object({
  timestamp: z.string()
})

// Types

export type Ping = z.infer<typeof PingSchema>

// Responses

export type PingResponse = Ping
