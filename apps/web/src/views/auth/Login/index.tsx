import { Google as GoogleIcon } from '@styled-icons/boxicons-logos/Google';
import { LogoPng } from '$web/assets/images';
import { Button } from '$web/components/Button';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginStyleWrapper } from './login.style';

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) navigate('/projects', { replace: true });
  }, [token, navigate]);

  return (
    <LoginStyleWrapper>
      <img src={LogoPng} alt="logo" />
      <h2>The Secret Store</h2>
      {!token && (
        <Button href="http://localhost:3000/auth/login">
          <GoogleIcon size={20} />
          Login with Google
        </Button>
      )}
    </LoginStyleWrapper>
  );
}
