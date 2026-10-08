export interface WordCloudItem {
  id: number
  label: string
  weight: number
  /** Texto completo al pasar el ratón; por defecto, la etiqueta. */
  hint?: string
}

/** Paleta de la nube: `weak` (rojos y ámbar) o `strong` (verdes). */
export type WordCloudTone = 'weak' | 'strong'

export interface WordCloudProps {
  items: WordCloudItem[]
  tone?: WordCloudTone
  ariaLabel?: string
  /** Si se indica, cada palabra es un botón. */
  onSelect?: (item: WordCloudItem) => void
}
