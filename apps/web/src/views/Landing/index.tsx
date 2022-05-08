import { LandingPageStyles } from './landing.style';
import { LogoPng } from '../../assets';

export function LandingPage() {
  return (
    <LandingPageStyles>
      <img src={LogoPng} alt="Logo" />
      <h1>The Secret Store</h1>
    </LandingPageStyles>
  );
}
