import { ErrorStackViewer } from '$web/components';

export function TestPage() {
  return (
    <div style={{ margin: '2rem' }}>
      <ErrorStackViewer error={new Error('Test error')} />
    </div>
  );
}
