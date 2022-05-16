import styled from 'styled-components';

export const ShowJsonStyleWrapper = styled.main`
  display: grid;
  place-content: center;
  place-items: center;
  text-align: center;
  min-height: 90vh;

  h1 {
    margin-bottom: 1rem;
  }

  pre {
    padding: 2rem;
    text-align: left;
    background-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.yellow};
    border-radius: 1.4rem;
    margin: 2rem;
  }
`;
