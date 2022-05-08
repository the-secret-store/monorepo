import styled from 'styled-components';

export const ButtonStyleWrapper = styled.button<{ variant: ButtonVariants }>`
  display: inline-flex;
  font-family: inherit;
  min-width: 12rem;
  padding: 1rem 2rem;
  align-items: center;
  justify-content: center;
  border-radius: ${props => (props.variant === 'error' ? '3rem' : '0.2rem')};
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
  outline: none;
  background-color: ${props => props.theme.colors[props.variant === 'primary' ? 'purple' : 'red']};
  color: ${({ theme, variant }) => (variant === 'error' ? theme.colors.white : theme.colors.black)};

  &:hover {
    box-shadow: 0 0 1rem
      ${props => props.theme.colors[props.variant === 'primary' ? 'purple' : 'red']};
  }
`;

export type ButtonVariants = 'primary' | 'error';
