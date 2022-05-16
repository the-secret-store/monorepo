import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Google as GoogleIcon } from '@styled-icons/boxicons-logos/Google';
import { LogoPng } from '$web/assets/images';
import { Button } from '$web/components';
import { Requests } from '$web/constants';
import { useAuthApi } from '$web/hooks';
import { getBaseUrl } from '$web/util';
import { LoginStyleWrapper } from './login.style';

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuthToken } = useAuthApi();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) return;
    navigate('/auth/login', { replace: true });
    setAuthToken(token);
  }, [token, navigate, setAuthToken]);

  return (
    <LoginStyleWrapper>
      <img src={LogoPng} alt='logo' />
      <h2>The Secret Store</h2>
      {!token && (
        <Button href={`${getBaseUrl()}/${Requests.LOGIN}`}>
          <GoogleIcon size={20} />
          Login with Google
        </Button>
      )}
    </LoginStyleWrapper>
  );
}
