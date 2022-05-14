import styled from 'styled-components';

export const SettingsStyleWrapper = styled.div`
  h1 {
    margin-bottom: 3rem;
  }

  .setting {
    margin-bottom: 2rem;
    background-color: ${props => props.theme.colors.dark};
    border-radius: 0.4rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    h2 {
      font-size: 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
`;
