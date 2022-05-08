import { LandingPageStyles } from './landing.style';
import Logo from '../../assets/Logo.png';

export function LandingPage() {
  return (
    <LandingPageStyles>
      <img src={Logo} alt="Logo" />
      <h1>The Secret Store</h1>
    </LandingPageStyles>
  );
}
