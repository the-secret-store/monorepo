import { Loader } from '$web/components';

export function TestPage() {
  return (
    <div style={{ margin: '2rem', height: '100vh', display: 'grid', placeContent: 'center' }}>
      <Loader />
    </div>
  );
}
