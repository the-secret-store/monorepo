import styled from 'styled-components';

export const ProjectSettingsStyleWrapper = styled.div`
  h1 {
    margin-bottom: 1em;
  }

  .setting {
    margin-bottom: 2rem;
    background-color: ${props => props.theme.colors.dark};
    border-radius: 0.4rem;
    padding: 2.4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    h2 {
      font-size: 2.2rem;
    }

    input {
      margin-bottom: 0;
    }

    .description {
      color: ${({ theme }) => theme.colors.yellow};
    }
  }

  .users-with-access {
    header {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;

      div {
        display: flex;
        gap: 2rem;
        align-items: baseline;
      }
    }

    ul {
      display: flex;
      list-style: none;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
      border-radius: 0.4rem;
      background-color: ${({ theme }) => theme.colors.black};

      img {
        border-radius: 50%;
      }
    }
  }
`;
