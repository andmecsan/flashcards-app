export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  /** Título de grupo; las opciones consecutivas con el mismo grupo se agrupan. */
  group?: string
}

export interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  /** Etiqueta visible encima del desplegable. */
  label?: string
  /** Nombre accesible cuando no hay `label` visible. */
  ariaLabel?: string
  /** Texto cuando ningún valor coincide con una opción. */
  placeholder?: string
  disabled?: boolean
  /** Ancho máximo del desplegable en rem; por defecto ocupa el ancho disponible. */
  maxWidth?: string
}
