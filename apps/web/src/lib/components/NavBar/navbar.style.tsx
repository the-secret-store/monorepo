import styled from 'styled-components';

export const NavBarStyleWrapper = styled.nav`
  display: flex;
  gap: 4rem;
  padding: 2rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark};
  font-size: 1.3rem;
  font-weight: 100;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 3.6rem;
    }

    h2 {
      font-size: 2.4rem;
      font-weight: 300;
      color: ${({ theme }) => theme.colors.purple};
    }
  }

  .links {
    flex-grow: 1;
    display: flex;
    gap: 3rem;
    justify-content: flex-end;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 3rem;
      border-radius: 100%;
    }
  }

  .text-btn {
    cursor: pointer;
  }
`;
