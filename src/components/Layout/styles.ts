import styled from 'styled-components'

export const PageWrapper = styled.div`
  min-height: 100%;
  background: ${({ theme }) => theme.colors.background};
`

export const Content = styled.main`
  max-width: 75rem;
  margin: 0 auto;
  padding: 32px;
`