import { useTheme } from 'styled-components'
import { Cloud, Item, Word, WordButton } from './styles'
import { fontSizeFor, shortLabel, sortForCloud, tierFor, TONE_COLORS } from './utils'
import type { WordCloudProps } from './types'

export const WordCloud = ({
  items,
  tone = 'weak',
  ariaLabel = 'Nube de palabras',
  onSelect,
}: WordCloudProps) => {
  const theme = useTheme()
  const weights = items.map((item) => item.weight)
  const min = Math.min(...weights)
  const max = Math.max(...weights)

  const colorFor = (weight: number) =>
    TONE_COLORS[tone][tierFor(weight, min, max)] ?? theme.colors.textSecondary

  return (
    <Cloud role="list" aria-label={ariaLabel}>
      {sortForCloud(items).map((item) => {
        const common = {
          title: item.hint ?? item.label,
          $size: fontSizeFor(item.weight, min, max),
          $color: colorFor(item.weight),
        }

        return (
          <Item key={item.id} role="listitem">
            {onSelect ? (
              <WordButton type="button" onClick={() => onSelect(item)} {...common}>
                {shortLabel(item.label)}
              </WordButton>
            ) : (
              <Word {...common}>{shortLabel(item.label)}</Word>
            )}
          </Item>
        )
      })}
    </Cloud>
  )
}
