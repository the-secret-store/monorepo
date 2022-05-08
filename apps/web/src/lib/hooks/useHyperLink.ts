import { useNavigate } from 'react-router-dom';

export function useHyperLink(link: string) {
  const navigate = useNavigate();

  return () => navigate(link);
}
