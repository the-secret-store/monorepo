import { Home5 as Home, Global } from '@styled-icons/remix-line';
import { Button } from '$web/components';
import { Error404StyleWrapper } from './404.style';

export function Error404({ container }: { container?: 'shell' | 'none' }) {
  return (
    <Error404StyleWrapper container={container ?? 'none'}>
      <div>
        4<Global size={80} />4
      </div>

      <p>The resource you're looking for does not exist</p>

      <Button variant='error' link='/'>
        <Home size={20} /> Take me home
      </Button>
    </Error404StyleWrapper>
  );
}
