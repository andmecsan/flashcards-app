import styled from 'styled-components'

export const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
  box-shadow: 0 0.0625rem 0.25rem ${({ theme }) => theme.colors.border};
`

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.border};
  margin-bottom: 0.75rem;
`

export const Tabs = styled.div`
  display: flex;
  gap: 1.25rem;
`

export const Tab = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  border-bottom: 0.125rem solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  margin-bottom: -0.0625rem;

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: 0.125rem;
  }
`

export const GroupSwitch = styled.div`
  display: inline-flex;
  margin-bottom: 0.375rem;
  padding: 0.125rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primaryLight};
`

export const GroupButton = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.surface : theme.colors.primary)};

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: 0.125rem;
  }
`

export const Message = styled.p`
  margin: 1rem 0;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const Hint = styled.p`
  margin: 0.5rem 0 0;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`
