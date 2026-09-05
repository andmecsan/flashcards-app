import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  gap: 1.5rem;
  max-width: 52rem;
  margin: 0 auto;
`

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 12rem;
`

export const Tab = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  background: ${({ $active, theme }) => $active ? theme.colors.surface : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textMuted};
  box-shadow: ${({ $active, theme }) => $active ? `0 0.0625rem 0.25rem ${theme.colors.border}` : 'none'};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
    background: ${({ $active, theme }) => $active ? theme.colors.surface : theme.colors.background};
  }
`

export const Panel = styled.div`
  flex: 1;
`

export const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.5rem;
  box-shadow: 0 0.0625rem 0.25rem ${({ theme }) => theme.colors.border};
`

export const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
`

export const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

export const RatingTable = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  margin: 0.75rem 0;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
`

export const RatingDesc = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const ModeCard = styled.div<{ $color: string; $bg: string }>`
  border-left: 3px solid ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  border-radius: 0 ${({ theme }) => theme.radii.md} ${({ theme }) => theme.radii.md} 0;
  padding: 1rem 1.25rem;
  margin: 0.75rem 0;
`

export const ModeTitle = styled.span<{ $color: string }>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ $color }) => $color};
  display: block;
  margin-bottom: 0.25rem;
`

export const ModeDesc = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`