import type { UseFormRegisterReturn } from 'react-hook-form'

export interface TextAreaProps {
  label?: string
  placeholder?: string
  error?: string
  registration?: UseFormRegisterReturn
  value?: string
  onChange?: (value: string) => void
}