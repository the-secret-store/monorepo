import styled from 'styled-components';

export const ErrorStackStyleWrapper = styled.pre`
  font-size: 1.5rem;
  white-space: pre-wrap;
  max-width: 100%;
  width: max-content;
  max-height: 70vh;
  overflow: auto;
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.dark};
  border-radius: 1rem;
  margin-bottom: 2em;
`;
