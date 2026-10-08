import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Modal } from '../Modal'
import { Button } from '../Button'
import { Select } from '../Select'
import { Form, Description, Field, ErrorText, Actions } from '../MoveCategoryModal/styles'
import { api } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'
import type { MergeTagModalProps } from './types'

/** Fusiona una etiqueta en otra: las tarjetas pasan a la de destino y esta desaparece. */
export const MergeTagModal = ({ tag, options, onMerged, onClose }: MergeTagModalProps) => {
  const [targetId, setTargetId] = useState('')
  const [serverError, setServerError] = useState('')

  const mutation = useMutation({
    mutationFn: (intoId: number) => api.post(`/tags/${tag.id}/merge`, { into_id: intoId }),
    onSuccess: () => {
      toast.success('Etiquetas fusionadas')
      onMerged()
    },
    onError: (error: unknown) => setServerError(getApiErrorMessage(error, 'No se pudo fusionar')),
  })

  return (
    <Modal title="Fusionar etiqueta" onClose={onClose}>
      <Form>
        <Description>
          Las tarjetas con «{tag.name}» pasarán a la etiqueta que elijas, y «{tag.name}» dejará de
          existir. No se puede deshacer.
        </Description>

        <Field>
          <Select
            label="Fusionar en"
            placeholder="Elige una etiqueta…"
            value={targetId}
            onChange={(value) => {
              setTargetId(value)
              setServerError('')
            }}
            options={options.map((option) => ({ value: String(option.id), label: option.name }))}
          />
          {serverError && <ErrorText role="alert">{serverError}</ErrorText>}
        </Field>

        <Actions>
          <Button $variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            $variant="danger"
            disabled={!targetId || mutation.isPending}
            onClick={() => mutation.mutate(Number(targetId))}
          >
            {mutation.isPending ? 'Fusionando…' : 'Fusionar'}
          </Button>
        </Actions>
      </Form>
    </Modal>
  )
}
