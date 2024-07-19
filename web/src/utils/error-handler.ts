// Define a type for error response
interface ErrorResponse {
  error?: string
  message?: string
  response: {
    data: {
      error?: string
    }
  }
}

// Type guard for checking error response
const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return (error as ErrorResponse)?.message !== undefined
}

// Global error handling function
export const handleError = (error: unknown, defaultMessage: string) => {
  // Use type guard to safely access error properties
  const errorMessage = isErrorResponse(error)
    ? error.response.data.error
    : defaultMessage

  console.error('Error: ', error)
  return errorMessage
}
