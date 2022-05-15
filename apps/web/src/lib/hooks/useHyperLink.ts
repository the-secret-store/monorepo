import { useNavigate } from 'react-router-dom';

export function useHyperLink(link: string, state?: unknown) {
  const navigate = useNavigate();

  return () => navigate(link, { state });
}
