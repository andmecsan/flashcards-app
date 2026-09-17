import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './index'
import { AuthProvider } from '../../context/AuthProvider'

const renderWithRoute = (initialPath: string) =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/login" element={<div>Página de login</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Página privada</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  )

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirige a /login si no hay token', () => {
    renderWithRoute('/')

    expect(screen.getByText('Página de login')).toBeInTheDocument()
    expect(screen.queryByText('Página privada')).not.toBeInTheDocument()
  })

  it('renderiza la ruta protegida si hay token', () => {
    localStorage.setItem('token', 'un-token')
    renderWithRoute('/')

    expect(screen.getByText('Página privada')).toBeInTheDocument()
  })
})
