export interface MoveCategoryModalProps {
  category: { id: number; name: string }
  /** Asignatura en la que está ahora; se excluye de las opciones. */
  currentDeckId: number
  onClose: () => void
}
