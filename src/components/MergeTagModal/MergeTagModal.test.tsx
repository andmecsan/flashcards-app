import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { AxiosError } from 'axios'
import { theme } from '../../styles/theme'
import { chooseOption, openSelect } from '../../test/select'
import { api } from '../../services/api'
import { MergeTagModal } from './index'

vi.mock('../../services/api', () => ({ api: { post: vi.fn() } }))
vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }))

const tag = { id: 1, name: 'Mates' }
const options = [{ id: 2, name: 'Matemáticas' }, { id: 3, name: 'Examen' }]

const setup = () => {
  const onMerged = vi.fn()
  const onClose = vi.fn()
  render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <MergeTagModal tag={tag} options={options} onMerged={onMerged} onClose={onClose} />
      </ThemeProvider>
    </QueryClientProvider>,
  )
  return { onMerged, onClose }
}

describe('MergeTagModal', () => {
  beforeEach(() => vi.mocked(api.post).mockReset())

  it('avisa de lo que va a pasar y ofrece las demás etiquetas', () => {
    setup()

    expect(screen.getByText(/«Mates» dejará de existir/)).toBeInTheDocument()
    openSelect('Fusionar en')

    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual(['Matemáticas', 'Examen'])
  })

  it('no permite fusionar hasta elegir destino', () => {
    setup()

    expect(screen.getByRole('button', { name: 'Fusionar' })).toBeDisabled()

    chooseOption('Fusionar en', 'Matemáticas')

    expect(screen.getByRole('button', { name: 'Fusionar' })).toBeEnabled()
  })

  it('envía el destino y avisa al terminar', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: {} })
    const { onMerged } = setup()

    chooseOption('Fusionar en', 'Matemáticas')
    fireEvent.click(screen.getByRole('button', { name: 'Fusionar' }))

    await waitFor(() => expect(onMerged).toHaveBeenCalled())
    expect(api.post).toHaveBeenCalledWith('/tags/1/merge', { into_id: 2 })
  })

  it('muestra el error del servidor sin cerrar', async () => {
    const error = new AxiosError('fail')
    error.response = { data: { errors: ['Elige otra etiqueta distinta'] } } as AxiosError['response']
    vi.mocked(api.post).mockRejectedValueOnce(error)
    const { onMerged } = setup()

    chooseOption('Fusionar en', 'Matemáticas')
    fireEvent.click(screen.getByRole('button', { name: 'Fusionar' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Elige otra etiqueta distinta')
    expect(onMerged).not.toHaveBeenCalled()
  })
})
