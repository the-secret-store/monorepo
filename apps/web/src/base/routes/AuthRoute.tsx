import { Navigate, Outlet } from 'react-router-dom';
import { useAuthApi } from '../auth';

export function AuthRoute({ redirect }: { redirect: string }) {
  const { isAuthenticated } = useAuthApi();

  return !isAuthenticated ? <Outlet /> : <Navigate to={redirect} />;
}
