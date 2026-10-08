import { Select } from '../Select'
import { DIFFICULTY_OPTIONS, isDifficulty } from '../../utils/difficulty'
import type { DifficultySelectProps } from './types'

export const DifficultySelect = ({
  label,
  emptyLabel = 'Sin definir',
  ariaLabel,
  value = '',
  counts,
  onChange,
}: DifficultySelectProps) => (
  <Select
    label={label}
    ariaLabel={ariaLabel}
    maxWidth="16rem"
    value={value}
    onChange={(next) => onChange?.(isDifficulty(next) ? next : '')}
    options={[
      { value: '', label: emptyLabel },
      ...DIFFICULTY_OPTIONS.map((option) => ({
        value: option.value,
        label: counts ? `${option.label} (${counts[option.value] ?? 0})` : option.label,
        disabled: counts !== undefined && counts[option.value] === 0 && value !== option.value,
      })),
    ]}
  />
)
