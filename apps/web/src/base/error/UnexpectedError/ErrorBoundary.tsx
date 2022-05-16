import { FallbackProps } from 'react-error-boundary';
import { Button } from '$web/components';
import { ErrorBoundaryStyleWrapper } from './error-boundary.style';

export function UnexpectedError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <ErrorBoundaryStyleWrapper>
      <h1 className='heading'>Something went wrong:</h1>
      <pre className='error-stack'>{error.stack}</pre>
      <Button variant='error' onClick={resetErrorBoundary}>
        Try again
      </Button>
    </ErrorBoundaryStyleWrapper>
  );
}
