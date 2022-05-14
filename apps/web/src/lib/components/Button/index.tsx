import { ButtonHTMLAttributes } from 'react';
import { useHyperLink } from '$web/hooks';
import { ButtonStyleWrapper, ButtonVariants } from './button.style';

export function Button({ children, variant, link, onClick, ...rest }: IButtonProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (link) onClick = useHyperLink(link);

  return (
    <ButtonStyleWrapper variant={variant ?? 'primary'} onClick={onClick} {...rest}>
      {children}
    </ButtonStyleWrapper>
  );
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  link?: string;
}
