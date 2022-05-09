import styled from 'styled-components';

export const Error404StyleWrapper = styled.div`
  display: grid;
  height: 100vh;
  place-content: center;
  place-items: center;
  gap: 2rem;

  div {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: 80px;
    color: ${({ theme }) => theme.colors.red};
  }
`;
