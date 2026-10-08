import { fireEvent, screen } from '@testing-library/react'

/** Abre el desplegable propio identificado por su nombre accesible. */
export const openSelect = (name: string | RegExp) =>
  fireEvent.click(screen.getByRole('combobox', { name }))

/** Abre el desplegable y pulsa una de sus opciones. */
export const chooseOption = (name: string | RegExp, option: string | RegExp) => {
  openSelect(name)
  fireEvent.click(screen.getByRole('option', { name: option }))
}

/** Texto que muestra el desplegable cerrado. */
export const selectedText = (name: string | RegExp) =>
  screen.getByRole('combobox', { name }).textContent
