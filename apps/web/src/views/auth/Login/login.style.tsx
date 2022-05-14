import styled from 'styled-components';

export const LoginStyleWrapper = styled.main`
  display: grid;
  gap: 0.5rem;
  min-height: 100vh;
  place-content: center;
  place-items: center;

  img {
    height: 6rem;
  }

  h2 {
    color: ${({ theme }) => theme.colors.purple};
    margin-bottom: 1em;
  }

  form {
    margin: 3rem;
    display: grid;
    place-content: center;
    place-items: center;
    gap: 1.5rem;
  }
`;
