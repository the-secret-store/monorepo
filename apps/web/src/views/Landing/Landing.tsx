import { LogoPng } from '$web/assets/images';
import { LandingPageStyles } from './landing.style';

export function LandingPage() {
  return (
    <LandingPageStyles>
      <img src={LogoPng} alt="Logo" />
      <h1>The Secret Store</h1>
    </LandingPageStyles>
  );
}
