import { Globe } from '@styled-icons/boxicons-regular/Globe';
import { Button } from '$web/components';
import { Error404StyleWrapper } from './404.style';

export function Error404({ container }: { container: 'shell' | 'none' } = { container: 'none' }) {
  return (
    <Error404StyleWrapper container={container}>
      <div>
        4<Globe size={80} />4
      </div>

      <h5>The resource you're looking for does not exist</h5>

      <Button variant='error' link='/'>
        Take me home
      </Button>
    </Error404StyleWrapper>
  );
}
