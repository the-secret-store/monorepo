import { ShowJsonStyleWrapper } from './jsonviewer.style';

export function JsonViewer({ json }: { json: Record<string, unknown> }) {
  return <ShowJsonStyleWrapper>{JSON.stringify(json, null, '  ')}</ShowJsonStyleWrapper>;
}
