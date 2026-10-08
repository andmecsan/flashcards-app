import { useId, useState } from 'react'
import { X } from 'lucide-react'
import { Wrapper, Label, Box, Chip, RemoveChip, Field } from './styles'
import { addTag, MAX_TAG_LENGTH, MAX_TAGS_PER_CARD, normalizeTag } from '../../utils/tags'
import type { TagInputProps } from './types'

export const TagInput = ({ label, value, onChange, suggestions = [] }: TagInputProps) => {
  const id = useId()
  const listId = `${id}-suggestions`
  const [draft, setDraft] = useState('')

  const full = value.length >= MAX_TAGS_PER_CARD
  const available = suggestions.filter(
    (s) => !value.some((v) => normalizeTag(v) === normalizeTag(s)),
  )

  const commit = () => {
    if (draft.trim()) onChange(addTag(value, draft))
    setDraft('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commit()
    } else if (e.key === 'Backspace' && !draft && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Box>
        {value.map((tag) => (
          <Chip key={tag}>
            {tag}
            <RemoveChip
              type="button"
              aria-label={`Quitar etiqueta ${tag}`}
              onClick={() => onChange(value.filter((t) => t !== tag))}
            >
              <X size={12} />
            </RemoveChip>
          </Chip>
        ))}
        <Field
          id={id}
          list={listId}
          value={draft}
          maxLength={MAX_TAG_LENGTH}
          disabled={full}
          placeholder={full ? `Máximo ${MAX_TAGS_PER_CARD} etiquetas` : 'Escribe y pulsa Intro'}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
        />
        <datalist id={listId}>
          {available.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </Box>
    </Wrapper>
  )
}
