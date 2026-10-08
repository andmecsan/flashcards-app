export interface TagInputProps {
  label?: string
  value: string[]
  onChange: (tags: string[]) => void
  /** Etiquetas ya existentes del usuario, para autocompletar. */
  suggestions?: string[]
}
