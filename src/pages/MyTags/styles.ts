import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const Intro = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 0.0625rem 0.25rem ${({ theme }) => theme.colors.border};
`

export const Row = styled.li`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`

export const TagName = styled.span`
  display: inline-block;
  padding: 0.125rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  font-weight: 600;
`

export const Count = styled.span`
  margin-right: auto;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const RowActions = styled.div`
  display: flex;
  gap: 0.375rem;
`

export const EditForm = styled.form`
  display: flex;
  align-items: flex-start;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.5rem;

  > :first-child {
    flex: 1;
    min-width: 10rem;
  }
`

export const EmptyState = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`
