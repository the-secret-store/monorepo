import { Button, TextInput } from '$web/components';
import { LogoPng } from '$web/assets/images';
import { handleLogin } from './login.service';
import { LoginStyleWrapper } from './login.style';

export function Login() {
  return (
    <LoginStyleWrapper>
      <img src={LogoPng} alt="logo" />
      <h2>The Secret Store</h2>

      <form onSubmit={handleLogin}>
        <TextInput label="Email" />
        <TextInput label="Password" type="password" />
        <Button type="submit">Login</Button>
      </form>
    </LoginStyleWrapper>
  );
}
