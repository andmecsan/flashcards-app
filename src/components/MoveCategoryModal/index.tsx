import { Modal } from '../Modal'
import { Button } from '../Button'
import { Select } from '../Select'
import { Form, Description, Field, ErrorText, Actions } from './styles'
import { useMoveCategory } from './useMoveCategory'
import type { MoveCategoryModalProps } from './types'

export const MoveCategoryModal = ({ category, currentDeckId, onClose }: MoveCategoryModalProps) => {
  const { targets, loading, targetId, handleChange, handleSubmit, saving, serverError } =
    useMoveCategory(category.id, currentDeckId, onClose)

  return (
    <Modal title="Mover temario" onClose={onClose}>
      <Form>
        <Description>
          «{category.name}» pasará a la asignatura que elijas, con todas sus tarjetas y tu progreso
          de estudio.
        </Description>

        {!loading && targets.length === 0 ? (
          <Description>
            Solo tienes esta asignatura. Crea otra desde el inicio para poder mover temarios.
          </Description>
        ) : (
          <Field>
            <Select
              label="Asignatura de destino"
              placeholder="Elige una asignatura…"
              value={targetId}
              disabled={loading}
              onChange={handleChange}
              options={targets.map((deck) => ({ value: String(deck.id), label: `${deck.icon} ${deck.name}` }))}
            />
            {serverError && <ErrorText role="alert">{serverError}</ErrorText>}
          </Field>
        )}

        <Actions>
          <Button $variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!targetId || saving}>
            {saving ? 'Moviendo…' : 'Mover'}
          </Button>
        </Actions>
      </Form>
    </Modal>
  )
}
