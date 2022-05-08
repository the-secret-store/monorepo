import styled from 'styled-components';

export const ErrorBoundaryStyleWrapper = styled.main`
  display: grid;
  height: 100vh;
  place-content: center;
  place-items: center;

  .heading {
    font-size: 3rem;
    text-align: center;
    color: ${props => props.theme.colors.red};
    margin-bottom: 1em;
  }

  .error-stack {
    font-size: 1.5rem;
    white-space: pre-wrap;
    max-width: 100%;
    max-height: 70vh;
    overflow: auto;
    padding: 1.5rem;
    background-color: ${props => props.theme.colors.slate};
    border-radius: 1rem;
    margin-bottom: 2em;
  }
`;
