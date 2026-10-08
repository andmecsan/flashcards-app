import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { AxiosError } from 'axios'
import { theme } from '../../styles/theme'
import { chooseOption, openSelect } from '../../test/select'
import { api } from '../../services/api'
import { MoveCategoryModal } from './index'

vi.mock('../../services/api', () => ({ api: { get: vi.fn(), patch: vi.fn() } }))
vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }))

const deck = (id: number, name: string) => ({
  id, name, icon: '📚', color: '#7C3AED', favorite: false,
  card_count: 0, due_count: 0, mastered: 0, in_progress: 0, new_cards: 0, created_at: '',
})

const decks = [deck(1, 'Chino'), deck(2, 'Inglés'), deck(3, 'Algoritmos')]

const setup = (onClose = vi.fn()) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <MoveCategoryModal category={{ id: 10, name: 'Números' }} currentDeckId={1} onClose={onClose} />
      </ThemeProvider>
    </QueryClientProvider>,
  )
  return onClose
}

describe('MoveCategoryModal', () => {
  beforeEach(() => {
    vi.mocked(api.get).mockResolvedValue({ data: { decks, meta: {} } })
    vi.mocked(api.patch).mockReset()
  })

  it('ofrece las demás asignaturas y excluye la actual', async () => {
    setup()

    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Asignatura de destino' })).toBeEnabled())
    openSelect('Asignatura de destino')

    expect(screen.getByRole('option', { name: /Inglés/ })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /Algoritmos/ })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: /Chino/ })).not.toBeInTheDocument()
  })

  it('no permite mover hasta elegir una asignatura', async () => {
    setup()
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Asignatura de destino' })).toBeEnabled())

    expect(screen.getByRole('button', { name: 'Mover' })).toBeDisabled()

    chooseOption('Asignatura de destino', /Inglés/)

    expect(screen.getByRole('button', { name: 'Mover' })).toBeEnabled()
  })

  it('envía la asignatura elegida y se cierra al terminar', async () => {
    vi.mocked(api.patch).mockResolvedValue({ data: {} })
    const onClose = setup()
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Asignatura de destino' })).toBeEnabled())

    chooseOption('Asignatura de destino', /Inglés/)
    fireEvent.click(screen.getByRole('button', { name: 'Mover' }))

    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(api.patch).toHaveBeenCalledWith('/categories/10/move', { deck_id: 2 })
  })

  it('muestra el error del servidor si el nombre ya existe en el destino', async () => {
    const error = new AxiosError('fail')
    error.response = {
      data: { errors: ['Ya existe un temario con ese nombre en «Inglés». Renómbralo antes de moverlo.'] },
    } as AxiosError['response']
    vi.mocked(api.patch).mockRejectedValue(error)
    const onClose = setup()
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Asignatura de destino' })).toBeEnabled())

    chooseOption('Asignatura de destino', /Inglés/)
    fireEvent.click(screen.getByRole('button', { name: 'Mover' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Ya existe un temario con ese nombre')
    expect(onClose).not.toHaveBeenCalled()
  })

  it('avisa si solo existe la asignatura actual', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { decks: [deck(1, 'Chino')], meta: {} } })
    setup()

    expect(await screen.findByText(/Solo tienes esta asignatura/)).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'Asignatura de destino' })).not.toBeInTheDocument()
  })
})
