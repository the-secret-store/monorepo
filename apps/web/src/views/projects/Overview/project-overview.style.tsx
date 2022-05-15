import styled from 'styled-components';

export const ProjectOverviewStyleWrapper = styled.div`
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

    h6 {
      font-weight: 400;
      font-size: 1.2rem;
    }
  }

  .value-head {
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      cursor: pointer;
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
