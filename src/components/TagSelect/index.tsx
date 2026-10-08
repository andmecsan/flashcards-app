import { Select } from '../Select'
import type { TagSelectProps } from './types'

/** Filtro por etiqueta personal, con el nº de tarjetas de cada una. */
export const TagSelect = ({
  options,
  value,
  onChange,
  ariaLabel = 'Filtrar por etiqueta',
  emptyLabel = 'Todas las etiquetas',
}: TagSelectProps) => (
  <Select
    ariaLabel={ariaLabel}
    maxWidth="16rem"
    value={value}
    onChange={onChange}
    options={[
      { value: '', label: emptyLabel },
      ...options.map((option) => ({ value: String(option.id), label: `${option.name} (${option.count})` })),
    ]}
  />
)
