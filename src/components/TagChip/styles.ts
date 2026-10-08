import styled from 'styled-components'

/** Chip de etiqueta con el color de la propia etiqueta (fondo suave, texto oscurecido). */
export const Chip = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: color-mix(in srgb, ${({ $color }) => $color} 14%, white);
  color: color-mix(in srgb, ${({ $color }) => $color} 75%, black);
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`
