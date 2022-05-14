import styled from 'styled-components';

export const ProjectOverviewStyleWrapper = styled.div`
  .container {
    max-width: 100rem;
    width: 80%;
    margin: 4rem auto;
  }

  header.project-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 4rem;

    .row {
      display: flex;
      gap: 3rem;
      align-items: baseline;
    }

    h1 {
      font-size: 2.6rem;
    }

    h6 {
      font-size: 1.4rem;
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;

    .left {
      display: flex;
      gap: 2rem;
    }
  }
`;
