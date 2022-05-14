import { ITheme } from '../../../base/theme';
import styled from 'styled-components';

export const ChipStyleWrapper = styled.span<{ color?: keyof ITheme['colors'] }>`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  border-radius: 1.4rem;
  background-color: ${({ theme, color }) => theme.colors[color ?? 'purple']};
  color: ${({ theme }) => theme.colors.black};
  min-width: 3rem;
  width: max-content;
`;
