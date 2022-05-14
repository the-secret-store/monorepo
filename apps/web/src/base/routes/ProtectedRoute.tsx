import { Navigate, Outlet } from 'react-router-dom';
import { useAuthApi } from '../auth';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthApi();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
}
