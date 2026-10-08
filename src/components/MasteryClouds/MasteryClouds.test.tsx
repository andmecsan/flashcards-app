import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme'
import { MasteryClouds } from './index'
import { toCloudItems } from './utils'
import type { MasteryData, MasteryEntry } from './types'

const entry = (over: Partial<MasteryEntry>): MasteryEntry => ({
  id: 1,
  name: 'Números',
  deck_id: 10,
  deck_name: 'Chino',
  reviews: 8,
  success_rate: 25,
  mastered: 0,
  total_cards: 10,
  weakness: 1.5,
  strength: 0.2,
  ...over,
})

const data: MasteryData = {
  weak: [entry({ id: 1, name: 'Números', deck_id: 10 })],
  strong: [entry({ id: 2, name: 'Saludos', deck_id: 11, deck_name: 'Inglés', success_rate: 95, strength: 0.9 })],
  total_reviews: 20,
  min_reviews: 5,
}

const tagData: MasteryData = {
  weak: [entry({ id: 40, name: 'Fórmulas', deck_id: 12, deck_name: 'Física' })],
  strong: [entry({ id: 41, name: 'Vocabulario', deck_id: 10, strength: 0.8 })],
  total_reviews: 12,
  min_reviews: 5,
}

describe('toCloudItems', () => {
  it('usa el nombre del temario y detalla los datos en el hint', () => {
    const [item] = toCloudItems([entry({})], (e) => e.weakness)

    expect(item).toMatchObject({ id: 1, label: 'Números', weight: 1.5 })
    expect(item.hint).toContain('Chino · Números')
    expect(item.hint).toContain('25 % de acierto')
    expect(item.hint).toContain('8 repasos')
  })

  it('antepone la asignatura cuando dos temarios se llaman igual', () => {
    const items = toCloudItems(
      [entry({ id: 1, deck_name: 'Chino' }), entry({ id: 2, deck_name: 'Inglés' })],
      (e) => e.weakness,
    )

    expect(items.map((i) => i.label)).toEqual(['Chino · Números', 'Inglés · Números'])
  })

  it('con etiquetas no antepone asignatura ni la menciona en el hint', () => {
    const [item] = toCloudItems([entry({ name: 'Fórmulas' })], (e) => e.weakness, 'tag')

    expect(item.label).toBe('Fórmulas')
    expect(item.hint).toBe('Fórmulas: 25 % de acierto, 8 repasos, 0/10 tarjetas dominadas')
  })
})

describe('MasteryClouds', () => {
  it('abre en «Para reforzar» y muestra sus temarios', () => {
    renderWithTheme(<MasteryClouds data={data} onSelect={vi.fn()} />)

    expect(screen.getByRole('tab', { name: 'Para reforzar' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('button', { name: 'Números' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Saludos' })).not.toBeInTheDocument()
  })

  it('cambia a «Puntos fuertes»', () => {
    renderWithTheme(<MasteryClouds data={data} onSelect={vi.fn()} />)

    fireEvent.click(screen.getByRole('tab', { name: 'Puntos fuertes' }))

    expect(screen.getByRole('button', { name: 'Saludos' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Números' })).not.toBeInTheDocument()
  })

  it('al pulsar un temario avisa con su entrada y la agrupación «category»', () => {
    const onSelect = vi.fn()
    renderWithTheme(<MasteryClouds data={data} onSelect={onSelect} />)

    fireEvent.click(screen.getByRole('button', { name: 'Números' }))

    expect(onSelect).toHaveBeenCalledWith(data.weak[0], 'category')
  })

  it('explica el estado vacío de cada pestaña', () => {
    renderWithTheme(<MasteryClouds data={{ ...data, weak: [], strong: [] }} onSelect={vi.fn()} />)

    expect(screen.getByText(/Ningún temario necesita refuerzo/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('tab', { name: 'Puntos fuertes' }))

    expect(screen.getByText(/Aún no hay puntos fuertes/)).toBeInTheDocument()
  })

  it('indica cuántos repasos hacen falta para aparecer', () => {
    renderWithTheme(<MasteryClouds data={data} onSelect={vi.fn()} />)

    expect(screen.getByText(/al menos 5 repasos/)).toBeInTheDocument()
  })

  describe('agrupación por etiqueta', () => {
    it('no ofrece el selector si no hay repasos con etiquetas', () => {
      renderWithTheme(<MasteryClouds data={data} onSelect={vi.fn()} />)
      expect(screen.queryByRole('button', { name: 'Por etiqueta' })).not.toBeInTheDocument()

      renderWithTheme(
        <MasteryClouds data={data} tagData={{ ...tagData, total_reviews: 0 }} onSelect={vi.fn()} />,
      )
      expect(screen.queryByRole('button', { name: 'Por etiqueta' })).not.toBeInTheDocument()
    })

    it('empieza por temario y permite pasar a etiqueta', () => {
      renderWithTheme(<MasteryClouds data={data} tagData={tagData} onSelect={vi.fn()} />)

      expect(screen.getByRole('button', { name: 'Por temario' })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: 'Números' })).toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: 'Por etiqueta' }))

      expect(screen.getByRole('button', { name: 'Por etiqueta' })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: 'Fórmulas' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Números' })).not.toBeInTheDocument()
    })

    it('conserva la pestaña elegida al cambiar de agrupación', () => {
      renderWithTheme(<MasteryClouds data={data} tagData={tagData} onSelect={vi.fn()} />)

      fireEvent.click(screen.getByRole('tab', { name: 'Puntos fuertes' }))
      fireEvent.click(screen.getByRole('button', { name: 'Por etiqueta' }))

      expect(screen.getByRole('button', { name: 'Vocabulario' })).toBeInTheDocument()
    })

    it('al pulsar una etiqueta avisa con la agrupación «tag»', () => {
      const onSelect = vi.fn()
      renderWithTheme(<MasteryClouds data={data} tagData={tagData} onSelect={onSelect} />)

      fireEvent.click(screen.getByRole('button', { name: 'Por etiqueta' }))
      fireEvent.click(screen.getByRole('button', { name: 'Fórmulas' }))

      expect(onSelect).toHaveBeenCalledWith(tagData.weak[0], 'tag')
    })

    it('usa textos propios de las etiquetas', () => {
      renderWithTheme(<MasteryClouds data={data} tagData={{ ...tagData, weak: [] }} onSelect={vi.fn()} />)

      fireEvent.click(screen.getByRole('button', { name: 'Por etiqueta' }))

      expect(screen.getByText(/Ninguna etiqueta necesita refuerzo/)).toBeInTheDocument()
    })
  })
})
