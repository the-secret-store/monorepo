import { ITheme } from '../../../base/theme';
import { ReactNode } from 'react';
import { ChipStyleWrapper } from './chip.style';

export function Chip({ children, color }: IChipProps) {
  return <ChipStyleWrapper color={color}>{children}</ChipStyleWrapper>;
}

interface IChipProps {
  color?: keyof ITheme['colors'];
  children: ReactNode;
}
