import styled from 'styled-components'

export const FormWrapper = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const CardRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
`

export const CardInputs = styled.div`
  flex: 1;
  display: flex;
  gap: 0.75rem;
`

export const CardNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  min-width: 1.5rem;
  padding-top: 2.25rem;
`

export const RemoveButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.75rem;
  transition: color 0.15s, background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.dangerLight};
    color: ${({ theme }) => theme.colors.danger};
  }
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`

export const ErrorMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
`