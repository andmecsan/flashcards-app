import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme'
import { TagInput } from './index'

const type = (value: string) => {
  const input = screen.getByLabelText('Etiquetas')
  fireEvent.change(input, { target: { value } })
  return input
}

describe('TagInput', () => {
  it('muestra las etiquetas actuales como chips', () => {
    renderWithTheme(<TagInput label="Etiquetas" value={['Examen', 'Teoría']} onChange={vi.fn()} />)

    expect(screen.getByText('Examen')).toBeInTheDocument()
    expect(screen.getByText('Teoría')).toBeInTheDocument()
  })

  it('añade la etiqueta al pulsar Intro', () => {
    const onChange = vi.fn()
    renderWithTheme(<TagInput label="Etiquetas" value={['A']} onChange={onChange} />)

    fireEvent.keyDown(type('Nueva'), { key: 'Enter' })

    expect(onChange).toHaveBeenCalledWith(['A', 'Nueva'])
  })

  it('también añade con la coma y al salir del campo', () => {
    const onChange = vi.fn()
    renderWithTheme(<TagInput label="Etiquetas" value={[]} onChange={onChange} />)

    fireEvent.keyDown(type('Uno'), { key: ',' })
    expect(onChange).toHaveBeenLastCalledWith(['Uno'])

    fireEvent.blur(type('Dos'))
    expect(onChange).toHaveBeenLastCalledWith(['Dos'])
  })

  it('no añade repetidas ni vacías', () => {
    const onChange = vi.fn()
    renderWithTheme(<TagInput label="Etiquetas" value={['Examen']} onChange={onChange} />)

    fireEvent.keyDown(type('EXÁMEN'), { key: 'Enter' })
    fireEvent.keyDown(type('   '), { key: 'Enter' })

    expect(onChange).toHaveBeenNthCalledWith(1, ['Examen'])
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('quita una etiqueta con su botón', () => {
    const onChange = vi.fn()
    renderWithTheme(<TagInput label="Etiquetas" value={['A', 'B']} onChange={onChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Quitar etiqueta A' }))

    expect(onChange).toHaveBeenCalledWith(['B'])
  })

  it('con Retroceso en un campo vacío quita la última', () => {
    const onChange = vi.fn()
    renderWithTheme(<TagInput label="Etiquetas" value={['A', 'B']} onChange={onChange} />)

    fireEvent.keyDown(screen.getByLabelText('Etiquetas'), { key: 'Backspace' })

    expect(onChange).toHaveBeenCalledWith(['A'])
  })

  it('se bloquea al llegar al máximo', () => {
    renderWithTheme(<TagInput label="Etiquetas" value={['1', '2', '3', '4', '5']} onChange={vi.fn()} />)

    expect(screen.getByLabelText('Etiquetas')).toBeDisabled()
  })

  it('sugiere las etiquetas existentes que aún no están puestas', () => {
    const { container } = renderWithTheme(
      <TagInput label="Etiquetas" value={['Examen']} onChange={vi.fn()} suggestions={['Examen', 'Teoría']} />,
    )

    const options = [...container.querySelectorAll('datalist option')].map((o) => o.getAttribute('value'))
    expect(options).toEqual(['Teoría'])
  })
})
