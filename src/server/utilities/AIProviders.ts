import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createOpenAI } from "@ai-sdk/openai"
import { createXai } from "@ai-sdk/xai"

const openAIAPIKey = process.env.OPENAI_API_KEY
const googleAIAPIKey = process.env.GOOGLE_AI_API_KEY
const xAIAPIKey = process.env.XAI_API_KEY

export const openai = openAIAPIKey
  ? createOpenAI({
      apiKey: openAIAPIKey
    })
  : null

export const google = googleAIAPIKey
  ? createGoogleGenerativeAI({
      apiKey: googleAIAPIKey
    })
  : null

export const xai = xAIAPIKey
  ? createXai({
      apiKey: xAIAPIKey
    })
  : null
