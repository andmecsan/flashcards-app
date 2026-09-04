import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 0.75rem;
`

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: 0 0.0625rem 0.25rem ${({ theme }) => theme.colors.border};
`

export const StatValue = styled.span<{ $color?: string }>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ $color, theme }) => $color || theme.colors.text};
`

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const ProgressWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1rem;
  box-shadow: 0 0.0625rem 0.25rem ${({ theme }) => theme.colors.border};
`

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

export const ProgressLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

export const ProgressTrack = styled.div`
  height: 0.5rem;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
  display: flex;
`

export const ProgressSegment = styled.div<{ $percent: number; $color: string }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${({ $color }) => $color};
  transition: width 0.3s ease;
`

export const ProgressLegend = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const LegendDot = styled.div<{ $color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ $color }) => $color};
`


export const ReviewBanner = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ReviewInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`