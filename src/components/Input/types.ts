import type { UseFormRegisterReturn } from 'react-hook-form'

export interface InputProps {
  label?: string
  placeholder?: string
  type?: string
  error?: string
  icon?: React.ReactNode
  registration?: UseFormRegisterReturn
  value?: string
  onChange?: (value: string) => void
}