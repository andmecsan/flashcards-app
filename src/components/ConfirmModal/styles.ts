import styled from 'styled-components'

export const Message = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: 1.5rem;
`

export const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`