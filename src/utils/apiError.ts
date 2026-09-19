import { AxiosError } from 'axios'

interface ApiErrorBody {
  errors?: string[]
  error?: string
}

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorBody | undefined
    const message = body?.errors?.[0] ?? body?.error
    if (message) return message
  }
  return fallback
}
