import styled from 'styled-components'

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const DropZone = styled.label<{ $hasFile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2.5rem 1.5rem;
  border: 2px dashed ${({ theme, $hasFile }) => $hasFile ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme, $hasFile }) => $hasFile ? theme.colors.primaryLight : theme.colors.background};
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`

export const HiddenInput = styled.input`
  display: none;
`

export const DropIcon = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
`

export const DropText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`

export const FileName = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

export const ErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
`

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
`

export const LoadingText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`