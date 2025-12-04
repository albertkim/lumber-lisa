import { createFileRoute } from "@tanstack/react-router"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"

export const Route = createFileRoute("/dashboard/company/$companyId/ai")({
  component: RouteComponent,
})

function RouteComponent() {
  const { company } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")

  const token = localStorage.getItem("token")

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/v1/chat",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    onError: (error) => {
      console.error("Error in chat:", error)
    },
  })

  const handleSendMessage = (message: string) => {
    if (status === "submitted" || status === "streaming" || !message.trim()) return
    setInput("")
    sendMessage({ parts: [{ type: "text", text: message }] })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="h-full flex flex-col p-4">
      <div className="max-w-2xl mx-auto w-full h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>

        <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4">
          {messages.length === 0 && (
            <div className="text-gray-500">Start a conversation...</div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 p-3 rounded ${
                message.role === "user"
                  ? "bg-blue-100 ml-auto max-w-[80%]"
                  : "bg-gray-100 max-w-[80%]"
              }`}
            >
              {message.parts?.map((part, index) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div key={index} className="whitespace-pre-wrap">
                        {part.text}
                      </div>
                    )

                  case "tool-table-query-duckdb":
                    if (part.state === "output-available") {
                      return (
                        <div key={`${index}-${part.toolCallId}`} className="mt-2">
                          <div className="text-sm font-semibold mb-1">Query Results:</div>
                          <pre className="bg-white p-2 rounded text-xs overflow-auto">
                            {JSON.stringify(part.output, null, 2)}
                          </pre>
                        </div>
                      )
                    }
                    if (part.state === "input-streaming") {
                      return (
                        <div key={`${index}-${part.toolCallId}`} className="text-gray-500 text-sm">
                          Running query...
                        </div>
                      )
                    }
                    return null

                  default:
                    return null
                }
              })}
            </div>
          ))}

          {status === "submitted" || status === "streaming" ? (
            <div className="mb-3 p-3 rounded bg-gray-100 max-w-[80%] text-gray-500">
              Thinking...
            </div>
          ) : null}

          {error && (
            <div className="mb-3 p-3 rounded bg-red-100 text-red-700 max-w-[80%]">
              Error: {error?.message}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage(input)
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={status === "submitted" || status === "streaming"}
          />
          <Button
            type="submit"
            disabled={!input.trim() || status === "submitted" || status === "streaming"}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
