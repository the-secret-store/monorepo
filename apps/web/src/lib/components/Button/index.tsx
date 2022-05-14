/* eslint-disable react-hooks/rules-of-hooks */
import { useExternalLink, useHyperLink } from '$web/hooks';
import { ButtonHTMLAttributes } from 'react';
import { ButtonStyleWrapper, ButtonVariants } from './button.style';

export function Button({ children, variant, link, href, onClick, ...rest }: IButtonProps) {
  if (link) onClick = useHyperLink(link);
  if (href) onClick = useExternalLink(href);

  return (
    <ButtonStyleWrapper variant={variant ?? 'primary'} onClick={onClick} {...rest}>
      {children}
    </ButtonStyleWrapper>
  );
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  link?: string;
  href?: string;
}
