import styled from 'styled-components';

export const ProjectListStyleWrapper = styled.ol`
  list-style: none;
  display: grid;
  gap: 3rem;

  .link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.dark};
    border-radius: 0.4rem;
    padding: 2.5rem 3rem;
    border: 2px solid transparent;
    transition: all 0.3s;

    p {
      flex-grow: 1;
    }

    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.purple};
      color: ${({ theme }) => theme.colors.purple};
    }
  }
`;
