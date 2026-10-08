import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme'
import { openSelect, selectedText } from '../../test/select'
import { Select } from './index'
import type { SelectOption } from './types'

const options: SelectOption[] = [
  { value: '', label: 'Sin definir' },
  { value: 'a', label: 'Álgebra' },
  { value: 'b', label: 'Biología' },
  { value: 'c', label: 'Cálculo', disabled: true },
  { value: 'd', label: 'Dibujo' },
]

const setup = (props: Partial<React.ComponentProps<typeof Select>> = {}) => {
  const onChange = vi.fn()
  renderWithTheme(<Select label="Asignatura" options={options} value="" onChange={onChange} {...props} />)
  return { onChange, trigger: screen.getByRole('combobox', { name: 'Asignatura' }) }
}

const press = (el: HTMLElement, key: string) => fireEvent.keyDown(el, { key })

describe('Select', () => {
  describe('cerrado', () => {
    it('muestra la opción elegida', () => {
      setup({ value: 'b' })

      expect(selectedText('Asignatura')).toBe('Biología')
    })

    it('muestra el texto de ayuda si ningún valor coincide', () => {
      setup({ value: 'zzz', placeholder: 'Elige…' })

      expect(selectedText('Asignatura')).toBe('Elige…')
    })

    it('usa el nombre accesible cuando no hay etiqueta visible', () => {
      renderWithTheme(<Select ariaLabel="Filtro" options={options} value="" onChange={vi.fn()} />)

      expect(screen.getByRole('combobox', { name: 'Filtro' })).toBeInTheDocument()
    })

    it('no abre la lista si está desactivado', () => {
      const { trigger } = setup({ disabled: true })

      fireEvent.click(trigger)

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  describe('con el ratón', () => {
    it('abre la lista con sus opciones y marca la elegida', () => {
      const { trigger } = setup({ value: 'a' })

      fireEvent.click(trigger)

      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByRole('listbox', { name: 'Asignatura' })).toBeInTheDocument()
      expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual([
        'Sin definir', 'Álgebra', 'Biología', 'Cálculo', 'Dibujo',
      ])
      expect(screen.getByRole('option', { name: 'Álgebra' })).toHaveAttribute('aria-selected', 'true')
    })

    it('al pulsar una opción avisa con su valor y se cierra', () => {
      const { onChange, trigger } = setup()

      openSelect('Asignatura')
      fireEvent.click(screen.getByRole('option', { name: 'Biología' }))

      expect(onChange).toHaveBeenCalledWith('b')
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(trigger).toHaveFocus()
    })

    it('no deja elegir una opción desactivada', () => {
      const { onChange } = setup()

      openSelect('Asignatura')
      fireEvent.click(screen.getByRole('option', { name: 'Cálculo' }))

      expect(onChange).not.toHaveBeenCalled()
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })

    it('se cierra al hacer clic fuera', () => {
      setup()
      openSelect('Asignatura')

      fireEvent.mouseDown(document.body)

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('un segundo clic en el botón la cierra', () => {
      const { trigger } = setup()

      fireEvent.click(trigger)
      fireEvent.click(trigger)

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  describe('con el teclado', () => {
    it('se abre con la flecha abajo, Intro o Espacio', () => {
      for (const key of ['ArrowDown', 'ArrowUp', 'Enter', ' ']) {
        const { unmount } = renderWithTheme(
          <Select ariaLabel="x" options={options} value="" onChange={vi.fn()} />,
        )

        press(screen.getByRole('combobox'), key)

        expect(screen.getByRole('listbox')).toBeInTheDocument()
        unmount()
      }
    })

    it('empieza en la opción elegida', () => {
      const { trigger } = setup({ value: 'b' })

      press(trigger, 'ArrowDown')

      expect(trigger.getAttribute('aria-activedescendant')).toBe(
        screen.getByRole('option', { name: 'Biología' }).id,
      )
    })

    it('las flechas recorren las opciones saltándose las desactivadas', () => {
      const { onChange, trigger } = setup({ value: 'b' })

      press(trigger, 'ArrowDown') // abre en «Biología»
      press(trigger, 'ArrowDown') // salta «Cálculo» (desactivada) → «Dibujo»
      press(trigger, 'Enter')

      expect(onChange).toHaveBeenCalledWith('d')
    })

    it('da la vuelta al llegar al final', () => {
      const { onChange, trigger } = setup({ value: 'd' })

      press(trigger, 'ArrowDown') // abre en «Dibujo», la última
      press(trigger, 'ArrowDown') // vuelve a «Sin definir»
      press(trigger, 'Enter')

      expect(onChange).toHaveBeenCalledWith('')
    })

    it('da la vuelta al llegar al principio', () => {
      const { onChange, trigger } = setup({ value: '' })

      press(trigger, 'ArrowDown') // abre en «Sin definir», la primera
      press(trigger, 'ArrowUp') // salta a «Dibujo»
      press(trigger, 'Enter')

      expect(onChange).toHaveBeenCalledWith('d')
    })

    it('Inicio y Fin saltan a la primera y a la última', () => {
      const { onChange, trigger } = setup({ value: 'a' })

      press(trigger, 'ArrowDown')
      press(trigger, 'End')
      press(trigger, 'Enter')
      expect(onChange).toHaveBeenLastCalledWith('d')

      press(trigger, 'ArrowDown')
      press(trigger, 'Home')
      press(trigger, 'Enter')
      expect(onChange).toHaveBeenLastCalledWith('')
    })

    it('Escape cierra sin elegir', () => {
      const { onChange, trigger } = setup()

      press(trigger, 'ArrowDown')
      press(trigger, 'Escape')

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(onChange).not.toHaveBeenCalled()
    })

    it('Tab cierra sin elegir', () => {
      const { onChange, trigger } = setup()

      press(trigger, 'ArrowDown')
      press(trigger, 'Tab')

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(onChange).not.toHaveBeenCalled()
    })

    it('al escribir salta a la opción que empieza así, también con la lista cerrada', () => {
      const { onChange, trigger } = setup()

      press(trigger, 'b') // abre y se coloca en «Biología»
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      press(trigger, 'Enter')

      expect(onChange).toHaveBeenCalledWith('b')
    })

    it('al escribir ignora las opciones desactivadas', () => {
      const { onChange, trigger } = setup()

      press(trigger, 'ArrowDown')
      press(trigger, 'c') // «Cálculo» está desactivada: no hay coincidencia, no se mueve
      press(trigger, 'Enter')

      expect(onChange).toHaveBeenCalledWith('')
    })
  })

  describe('grupos', () => {
    const grouped: SelectOption[] = [
      { value: '1', label: 'ESO', group: 'Etapa' },
      { value: '2', label: 'Grado', group: 'Etapa' },
      { value: '3', label: 'B2', group: 'Idiomas' },
    ]

    it('muestra el título de cada grupo una sola vez', () => {
      renderWithTheme(<Select label="Nivel" options={grouped} value="" onChange={vi.fn()} />)

      openSelect('Nivel')

      expect(screen.getAllByText('Etapa')).toHaveLength(1)
      expect(screen.getAllByText('Idiomas')).toHaveLength(1)
      expect(screen.getAllByRole('option')).toHaveLength(3)
    })
  })
})
