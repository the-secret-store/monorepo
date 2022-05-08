import styled from 'styled-components';
import Logo from '../../assets/Logo.png';

export function LandingPage() {
  return (
    <StyleWrapper>
      <img src={Logo} alt="Logo" />
      <h1>The Secret Store</h1>
    </StyleWrapper>
  );
}

const StyleWrapper = styled.main`
  display: grid;
  height: 100vh;
  place-content: center;
  place-items: center;

  img {
    display: block;
    margin-bottom: 1rem;
  }

  h1 {
    font-weight: 100;
    color: ${({ theme }) => theme.colors.purple};
  }
`;
