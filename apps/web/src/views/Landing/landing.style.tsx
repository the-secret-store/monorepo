import styled from 'styled-components';

export const LandingPageStyles = styled.main`
  display: grid;
  height: 100vh;
  place-content: center;
  place-items: center;

  img {
    display: block;
    margin-bottom: 1rem;
  }

  h1 {
    font-weight: 100;
    color: ${({ theme }) => theme.colors.purple};
  }
`;
