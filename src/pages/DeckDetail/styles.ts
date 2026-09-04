import styled from 'styled-components'

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex: 1;
  min-width: 0;
`

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-right: auto;
`

export const SearchWrapper = styled.div`
  flex: 1;
  max-width: 20rem;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.25rem;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
`