export interface TagSelectOption {
  id: number
  name: string
  count: number
}

export interface TagSelectProps {
  options: TagSelectOption[]
  /** id de la etiqueta elegida, o '' para todas. */
  value: string
  onChange: (value: string) => void
  ariaLabel?: string
  emptyLabel?: string
}
