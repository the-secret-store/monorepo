import styled from 'styled-components';

export const EmptyListStyleWrapper = styled.div`
  display: grid;
  width: 100%;
  min-height: 40rem;
  max-height: 60%;
  place-content: center;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 1rem;
  gap: 2rem;
`;
