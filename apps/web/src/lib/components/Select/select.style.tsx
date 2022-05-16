import styled from 'styled-components';

export const SelectStyleWrapper = styled.div`
  display: grid;
  gap: 0.6rem;

  label {
    grid-row-start: 1;
  }

  select {
    font: inherit;
    color: inherit;
    background-color: inherit;
    min-width: 300px;
    max-width: max-content;
    border: 2px solid ${({ theme }) => theme.colors.dark};
    background-color: ${({ theme }) => theme.colors.dark};
    border-radius: 0.4rem;
    outline: none;
    padding: 1.1rem 1.4rem;
    transition: all 0.2s;
    margin-bottom: 2rem;

    &:focus {
      border: 2px solid ${({ theme }) => theme.colors.purple};
    }

    &:focus + label {
      color: ${({ theme }) => theme.colors.purple};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.black};
      color: ${props => props.theme.colors.slate};
      cursor: not-allowed;

      &:focus {
        border: 2px solid ${({ theme }) => theme.colors.dark};
      }
    }
  }
`;
