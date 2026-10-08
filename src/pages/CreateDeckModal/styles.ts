import styled from 'styled-components'

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TagFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const Hint = styled.p`
  margin: 0.5rem 0 0;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`
