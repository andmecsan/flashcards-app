import type { TagRef } from '../../utils/tags'

export interface CreateDeckModalProps {
  onClose: () => void
  onCreated?: (id: number) => void
  deck?: {
    id: number
    name: string
    icon: string
    color: string
    area?: TagRef | null
    level?: TagRef | null
    course?: TagRef | null
  }
}

export interface DeckFormData {
  name: string
  icon: string
  color: string
  /** id del área, nivel y curso elegidos; '' = sin definir (todo es opcional). */
  areaId: string
  levelId: string
  courseId: string
}