import styled from 'styled-components'

export const Wrapper = styled.div<{ $maxWidth?: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 10rem;
  max-width: ${({ $maxWidth }) => $maxWidth ?? 'none'};
`

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const Trigger = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid
    ${({ theme, $open }) => ($open ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primaryMid};
  }

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: 0.0625rem;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'none')};
    transition: transform 0.15s;
  }
`

export const Value = styled.span<{ $placeholder: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $placeholder }) => ($placeholder ? theme.colors.textMuted : 'inherit')};
`

export const List = styled.ul`
  position: fixed;
  z-index: 1000;
  width: max-content;
  max-width: min(22rem, calc(100vw - 1rem));
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.12);
`

export const GroupTitle = styled.li`
  padding: 0.5rem 0.625rem 0.25rem;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Option = styled.li<{ $active: boolean; $selected: boolean; $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.625rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, $disabled, $selected }) =>
    $disabled ? theme.colors.textMuted : $selected ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  background: ${({ theme, $active, $disabled }) =>
    $active && !$disabled ? theme.colors.primaryLight : 'transparent'};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 0.625rem;
  }
`
