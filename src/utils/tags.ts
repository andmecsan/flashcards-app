/** Etiqueta personal de un usuario (la que se pone en las tarjetas). */
export interface PersonalTag {
  id: number
  name: string
  cards_count?: number
}

/** Etiqueta del vocabulario controlado (área, nivel o curso) de una asignatura. */
export interface PredefinedTag {
  id: number
  name: string
  /** Solo en los niveles: «etapa» o «idiomas» (MCER). */
  group?: 'etapa' | 'idiomas'
  color?: string | null
}

export interface PredefinedTags {
  areas: PredefinedTag[]
  levels: PredefinedTag[]
  courses: PredefinedTag[]
}

export const MAX_TAGS_PER_CARD = 5
export const MAX_TAG_LENGTH = 30

/** Misma normalización que el servidor: sin mayúsculas, sin tildes latinas y con espacios colapsados. */
export const normalizeTag = (name: string): string =>
  name
    .normalize('NFKD')
    .replace(/(?<=\p{Script=Latin})\p{Mn}+/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .normalize('NFC')

/**
 * Añade una etiqueta a la lista si es válida y no está repetida (comparando
 * con la normalización del servidor). Devuelve la lista, igual si no se añade.
 */
export const addTag = (current: string[], raw: string): string[] => {
  const name = raw.replace(/\s+/g, ' ').trim().slice(0, MAX_TAG_LENGTH)
  if (!name || current.length >= MAX_TAGS_PER_CARD) return current
  if (current.some((t) => normalizeTag(t) === normalizeTag(name))) return current
  return [...current, name]
}

/** Referencia a una etiqueta predefinida tal como la devuelve el API en una asignatura. */
export interface TagRef {
  id: number
  name: string
  /** Color hexadecimal de la etiqueta predefinida. */
  color?: string | null
}
