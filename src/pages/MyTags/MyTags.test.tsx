import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../styles/theme'
import { openSelect } from '../../test/select'
import { AuthProvider } from '../../context/AuthProvider'
import { api } from '../../services/api'
import { MyTags } from './index'

vi.mock('../../services/api', () => ({ api: { get: vi.fn(), patch: vi.fn(), delete: vi.fn(), post: vi.fn() } }))
vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }))

const tags = [
  { id: 1, name: 'Examen', cards_count: 3 },
  { id: 2, name: 'Teoría', cards_count: 1 },
]

const setup = () =>
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <MemoryRouter>
            <MyTags />
          </MemoryRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  )

describe('MyTags', () => {
  beforeEach(() => {
    vi.mocked(api.get).mockResolvedValue({ data: tags })
    vi.mocked(api.patch).mockReset()
    vi.mocked(api.delete).mockReset()
  })

  it('lista las etiquetas con su nº de tarjetas', async () => {
    setup()

    expect(await screen.findByText('Examen')).toBeInTheDocument()
    expect(screen.getByText('3 tarjetas')).toBeInTheDocument()
    expect(screen.getByText('1 tarjeta')).toBeInTheDocument()
  })

  it('explica cómo crear etiquetas cuando no hay ninguna', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] })
    setup()

    expect(await screen.findByText(/Aún no tienes etiquetas/)).toBeInTheDocument()
  })

  it('renombra una etiqueta', async () => {
    vi.mocked(api.patch).mockResolvedValue({ data: {} })
    setup()
    await screen.findByText('Examen')

    fireEvent.click(screen.getByRole('button', { name: 'Renombrar Examen' }))
    fireEvent.change(screen.getByPlaceholderText('Nombre de la etiqueta'), { target: { value: 'Final' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    await waitFor(() => expect(api.patch).toHaveBeenCalledWith('/tags/1', { name: 'Final' }))
  })

  it('pide confirmación antes de eliminar y avisa de que no borra tarjetas', async () => {
    vi.mocked(api.delete).mockResolvedValue({ data: {} })
    setup()
    await screen.findByText('Examen')

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar Examen' }))

    expect(screen.getByText(/Se quitará de 3 tarjetas; las tarjetas no se borran/)).toBeInTheDocument()
    expect(api.delete).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar etiqueta' }))

    await waitFor(() => expect(api.delete).toHaveBeenCalledWith('/tags/1'))
  })

  it('abre el diálogo de fusión con las demás etiquetas', async () => {
    setup()
    await screen.findByText('Examen')

    fireEvent.click(screen.getByRole('button', { name: 'Fusionar Examen en otra' }))

    openSelect('Fusionar en')

    expect(screen.getByRole('option', { name: 'Teoría' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Examen' })).not.toBeInTheDocument()
  })

  it('desactiva la fusión si solo hay una etiqueta', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [tags[0]] })
    setup()
    await screen.findByText('Examen')

    expect(screen.getByRole('button', { name: 'Fusionar Examen en otra' })).toBeDisabled()
  })
})
