import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme'
import { DeckChips } from '.'

describe('DeckChips', () => {
  it('muestra área, nivel y curso en ese orden, saltando los que faltan', () => {
    renderWithTheme(
      <DeckChips
        tags={[{ id: 1, name: 'Ciencias', color: '#2563EB' }, null, { id: 3, name: '1.º', color: '#64748B' }]}
      />,
    )

    expect(screen.getByLabelText('Etiquetas').textContent).toBe('Ciencias1.º')
  })

  it('pone primero las pendientes y solo si hay alguna', () => {
    renderWithTheme(<DeckChips tags={[{ id: 1, name: 'Ciencias', color: '#2563EB' }]} pending={9} />)

    expect(screen.getByLabelText('Etiquetas').textContent).toBe('9 pendientesCiencias')
  })

  it('no pinta nada si no hay etiquetas ni pendientes', () => {
    renderWithTheme(<DeckChips tags={[undefined, null]} pending={0} />)

    expect(screen.queryByLabelText('Etiquetas')).not.toBeInTheDocument()
  })
})
