import { AxiosError } from 'axios'

interface ApiErrorBody {
  errors?: string[]
}

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof AxiosError) {
    const message = (error.response?.data as ApiErrorBody | undefined)?.errors?.[0]
    if (message) return message
  }
  return fallback
}
