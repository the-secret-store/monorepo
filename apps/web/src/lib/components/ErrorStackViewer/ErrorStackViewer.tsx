import { ErrorStackStyleWrapper } from './error-stack-viewer.style';

export function ErrorStackViewer({ error }: { error: Error }) {
  return <ErrorStackStyleWrapper>{error.stack}</ErrorStackStyleWrapper>;
}
