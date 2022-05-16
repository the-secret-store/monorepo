import { SpinnerRoundFilled } from 'spinners-react';
import { theme } from '$web/base/theme';
import { LoaderStyleWrapper } from './loader.style';

export function Loader() {
  return (
    <LoaderStyleWrapper>
      <SpinnerRoundFilled size={80} thickness={150} speed={100} color={theme.colors.purple} />
    </LoaderStyleWrapper>
  );
}
