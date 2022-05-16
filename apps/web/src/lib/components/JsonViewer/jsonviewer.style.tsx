import styled from 'styled-components';

export const ShowJsonStyleWrapper = styled.pre`
  padding: 2rem;
  text-align: left;
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.yellow};
  border-radius: 1.4rem;
  margin: 2rem;
`;
