import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid ${({ theme, $hasError }) => $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.15s;
  resize: none;
  height: 5rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

export const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
`