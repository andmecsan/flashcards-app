import { useTheme } from 'styled-components'
import type { TagRef } from '../../utils/tags'
import { Chip, List } from './styles'

/** Una etiqueta como chip; sin color propio usa el neutro del tema. */
export const TagChip = ({ tag }: { tag: TagRef }) => {
  const theme = useTheme()
  return <Chip $color={tag.color ?? theme.colors.textMuted}>{tag.name}</Chip>
}

/** Etiquetas de una asignatura: las pendientes de hoy y su área, nivel y curso, en ese orden. */
export const DeckChips = ({
  tags,
  pending = 0,
}: {
  tags: (TagRef | null | undefined)[]
  pending?: number
}) => {
  const theme = useTheme()
  const present = tags.filter((tag): tag is TagRef => !!tag)
  if (present.length === 0 && pending === 0) return null

  return (
    <List aria-label="Etiquetas">
      {pending > 0 && <Chip $color={theme.colors.primary}>{pending} pendientes</Chip>}
      {present.map((tag) => (
        <TagChip key={tag.id} tag={tag} />
      ))}
    </List>
  )
}
