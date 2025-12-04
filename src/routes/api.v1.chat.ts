import { createFileRoute } from '@tanstack/react-router'
import { authRequestMiddleware } from '@/server/server-functions/middleware/auth-middleware'
import { convertToModelMessages, createIdGenerator, createUIMessageStreamResponse, generateId, stepCountIs, streamText, UIMessage } from "ai"
import { getTableQueryDuckDBTool } from '@/server/ai/tools'
import dayjs from "dayjs"

const LLM_MODEL = "openai/gpt-5.1"

const SYSTEM_PROMPT = `
  You are a helpful AI assistant for an enterprise inventory management system
  
  You have access to the following tools:
  - table-query-duckdb: Use this tool to run a SQL query against the DuckDB database.

  Your DUckDB database contains the following tables:
  - inventory: The inventory of the company.

  The schema of the inventory table is as follows:
  - Product ID: The ID of the product.
  - Product Description: The description of the product.
  - Product Species: The species of the product.
  - Product Grade: The grade of the product.
  - Product Thickness: The thickness of the product.
  - Product Width: The width of the product.
  - Location ID: The ID of the location.
  - Inventory Group Name: The name of the inventory group.
  - Inventory Group ID: The ID of the inventory group.
  - Total Pieces: The total number of pieces in the inventory group.
  - Total FBM: The total FBM of the inventory group.
  - Total M3: The total M3 of the inventory group.
  - Number of Tags: The number of tags in the inventory group.

  Guidelines:

  - This is a big table - always limit the number of rows you are selecting to a maximum of 100. Never do a select * query, always specify the columns you need.
  - Note that most fields are nullable, so you will need to handle that in your SQL query.
  - DO NOT repeat the data to the user in your text response, just summarize your findings in a text message, short and concise. The user can already see the results of the SQL tool calls.
    - For example, if the user asks for the last 10 requests, your tool call should return the results of the query, then respond with "Here are the last 10 requests". DO NOT RESPONSE WITH "Here are the last 10 requests. 
  - Feel free to ask the user clarifying questions to help you get the data they need

  Examples:

  - Coming soon, do your best without
`

export const Route = createFileRoute('/api/v1/chat')({
  server: {
    middleware: [authRequestMiddleware],
    handlers: {
      POST: async ({ context, request }) => {

        const { user, company } = context

        const body = await request.json()
        const uiMessages = body.messages as UIMessage[]

        if (!uiMessages || !Array.isArray(uiMessages)) {
          return new Response(
            JSON.stringify({ error: "Invalid request body. 'messages' array is required." }),
            { status: 400 }
          )
        }

        // Prepare a single system message instance for this request
        const systemUiMessage: UIMessage = {
          role: "system",
          id: generateId(),
          parts: [{ type: "text", text: SYSTEM_PROMPT }],
        }

        // Include the system prompt when sending to the model, but avoid duplicates
        const uiMessagesWithSystemPrompt: UIMessage[] =
        uiMessages.length > 0 && uiMessages[0]?.role === "system"
          ? uiMessages
          : [systemUiMessage, ...uiMessages]

        const modelMessagesWithSystemPrompt = convertToModelMessages(uiMessagesWithSystemPrompt)

        const result = await streamText({
          model: LLM_MODEL,
          temperature: 0.3,
          messages: modelMessagesWithSystemPrompt,
          tools: {
            "table-query-duckdb": await getTableQueryDuckDBTool(
              company,
            ),
          },
          stopWhen: stepCountIs(5),
          onError: (error) => {
            console.error("Error in chat:", error)
          },
        })

        return createUIMessageStreamResponse({
          stream: result.toUIMessageStream({
            // Keep client UI unchanged by seeding with the original client messages
            originalMessages: uiMessages,
            generateMessageId: createIdGenerator(),
            messageMetadata: ({ part }) => {
              if (part.type === "finish") {
                return {
                  timestamp: dayjs().toISOString(),
                }
              }
            },
          }),
        })
      }
    }
  }
})
