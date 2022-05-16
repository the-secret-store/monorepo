import { Stars } from '@styled-icons/bootstrap';
import { theme } from '$web/base/theme';
import { EmptyListStyleWrapper } from './empty-list.style';

export function EmptyList() {
  return (
    <EmptyListStyleWrapper>
      <Stars size={150} color={theme.colors.purple} />
      <p>Woah! Such emptiness</p>
    </EmptyListStyleWrapper>
  );
}
