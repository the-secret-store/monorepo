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
`;
