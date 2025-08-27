import { StandardSchemaV1Issue } from "@tanstack/react-form"

interface Props {
  error?: string | { message: string } | null
  formOnSubmitError?: Record<string, StandardSchemaV1Issue[]>
}

// Convert camelCase to separate words
function camelCaseToWords(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .toLowerCase() // Make everything lowercase
    .trim() // Remove leading/trailing spaces
}

export function ErrorDisplay({ error, formOnSubmitError }: Props) {
  let errorMessage: string | undefined
  if (typeof error === "string") {
    errorMessage = error
  } else if (error?.message) {
    errorMessage = error.message
  }

  let zodErrorMessages: string[] | undefined
  if (formOnSubmitError) {
    zodErrorMessages = Object.values(formOnSubmitError).flatMap((error) =>
      error.map((e) => {
        const path = e.path?.join(".")
        if (path) {
          // Convert camelCase to words, then capitalize first letter of tag, lowercase first letter of message
          const wordsPath = camelCaseToWords(path)
          const capitalizedPath = wordsPath.charAt(0).toUpperCase() + wordsPath.slice(1)
          const lowercaseMessage = e.message.charAt(0).toLowerCase() + e.message.slice(1)
          return `${capitalizedPath}: ${lowercaseMessage}`
        }
        // If no path, just lowercase the first letter of the message
        return e.message.charAt(0).toLowerCase() + e.message.slice(1)
      })
    )
  }

  const allErrors = [errorMessage, ...(zodErrorMessages ?? [])].filter(Boolean)

  if (allErrors.length === 0) {
    return null
  }

  console.log({ error, formOnSubmitError })

  return (
    <div className="text-red-500 text-sm">
      {allErrors.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  )
}
