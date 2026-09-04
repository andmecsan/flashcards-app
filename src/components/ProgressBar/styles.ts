import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`

export const Track = styled.div`
  height: 0.375rem;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
  display: flex;
`

export const Segment = styled.div<{ $percent: number; $color: string }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${({ $color }) => $color};
  transition: width 0.3s ease;
`

export const Legend = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const LegendDot = styled.div<{ $color: string }>`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ $color }) => $color};
`