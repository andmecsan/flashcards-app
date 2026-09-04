import styled from 'styled-components'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 0.0625rem 0.25rem ${({ theme }) => theme.colors.border};
  margin-bottom: 2rem;
  overflow: hidden;
`

export const TopRow = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const StatSection = styled.div`
  flex: 1;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`

export const StatIcon = styled.div<{ $bg: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const StatValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
`

export const ReviewInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`