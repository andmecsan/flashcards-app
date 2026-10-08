import styled from 'styled-components'

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Description = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`

export const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.danger};
`

export const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;

    > * {
      width: 100%;
    }
  }
`
