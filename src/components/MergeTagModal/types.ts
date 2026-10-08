import type { PersonalTag } from '../../utils/tags'

export interface MergeTagModalProps {
  /** Etiqueta que desaparece al fusionar. */
  tag: PersonalTag
  /** Etiquetas posibles de destino (todas menos `tag`). */
  options: PersonalTag[]
  onMerged: () => void
  onClose: () => void
}
