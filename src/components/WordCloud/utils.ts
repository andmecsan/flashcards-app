import type { WordCloudItem, WordCloudTone } from './types'

export const MIN_FONT_REM = 0.875
export const MAX_FONT_REM = 2
const MAX_LABEL_LENGTH = 40

/** Colores por nivel (alto, medio, bajo), con contraste suficiente sobre blanco. */
export const TONE_COLORS: Record<WordCloudTone, [string, string, string?]> = {
  weak: ['#C93B3A', '#B45309'],
  strong: ['#0F6E56', '#2F8F7A'],
}

/**
 * Tamaño de letra proporcional al peso, entre MIN_FONT_REM y MAX_FONT_REM,
 * normalizado al rango [min, max] de la propia nube: así se nota la diferencia
 * aunque todos los pesos sean parecidos. Si no hay rango, tamaño intermedio.
 */
export const fontSizeFor = (weight: number, min: number, max: number): number => {
  if (max <= min) return Number(((MIN_FONT_REM + MAX_FONT_REM) / 2).toFixed(3))
  const ratio = Math.min(Math.max((weight - min) / (max - min), 0), 1)
  return Number((MIN_FONT_REM + ratio * (MAX_FONT_REM - MIN_FONT_REM)).toFixed(3))
}

/** Nivel 0 (alto), 1 (medio) o 2 (bajo) según la posición dentro del rango. */
export const tierFor = (weight: number, min: number, max: number): 0 | 1 | 2 => {
  if (max <= min) return 0
  const ratio = (weight - min) / (max - min)
  if (ratio >= 0.67) return 0
  if (ratio >= 0.34) return 1
  return 2
}

/** Recorta textos largos para que no desborden la nube. */
export const shortLabel = (text: string): string =>
  text.length > MAX_LABEL_LENGTH ? `${text.slice(0, MAX_LABEL_LENGTH - 1).trimEnd()}…` : text

/** Orden alfabético estable: la nube queda mezclada y no por tamaños. */
export const sortForCloud = (items: WordCloudItem[]): WordCloudItem[] =>
  [...items].sort((a, b) => a.label.localeCompare(b.label, 'es') || a.id - b.id)
