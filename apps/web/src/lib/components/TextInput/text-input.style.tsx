import styled from 'styled-components';

export const TextInputStyleWrapper = styled.div<{ state: InputElementStates }>`
  display: grid;
  gap: 0.5rem;

  label {
  }

  input {
    font: inherit;
    color: inherit;
    background-color: inherit;
    min-width: 300px;
    border: 2px solid ${({ theme }) => theme.colors.purple};
    border-radius: 0.2rem;
    outline: none;
    padding: 0.8rem 1.2rem;
  }
`;

export type InputElementStates = 'error' | 'success' | 'warning' | 'normal';
