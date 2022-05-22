import styled from 'styled-components';

export const Error404StyleWrapper = styled.div<{ container: 'shell' | 'none' }>`
  display: grid;
  min-height: ${({ container }) => (container === 'none' ? '100vh' : '80vh')};
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
