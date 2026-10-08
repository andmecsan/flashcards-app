import type { WordCloudItem } from '../WordCloud/types'
import type { MasteryEntry, MasteryGroup } from './types'

/**
 * Convierte el ranking en elementos de la nube. Entre temarios, si dos se llaman
 * igual se antepone la asignatura para distinguirlos; las etiquetas son únicas.
 */
export const toCloudItems = (
  entries: MasteryEntry[],
  weightOf: (entry: MasteryEntry) => number,
  group: MasteryGroup = 'category',
): WordCloudItem[] => {
  const counts = new Map<string, number>()
  entries.forEach((e) => counts.set(e.name, (counts.get(e.name) ?? 0) + 1))

  return entries.map((entry) => {
    const stats =
      `${entry.success_rate} % de acierto, ${entry.reviews} repasos, ` +
      `${entry.mastered}/${entry.total_cards} tarjetas dominadas`
    const ambiguous = group === 'category' && (counts.get(entry.name) ?? 0) > 1
    const where = group === 'category' && entry.deck_name ? `${entry.deck_name} · ` : ''

    return {
      id: entry.id,
      label: ambiguous && entry.deck_name ? `${entry.deck_name} · ${entry.name}` : entry.name,
      weight: weightOf(entry),
      hint: `${where}${entry.name}: ${stats}`,
    }
  })
}
