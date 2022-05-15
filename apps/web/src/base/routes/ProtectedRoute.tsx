import { NavBar } from '$web/components/NavBar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthApi } from '../auth';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthApi();

  return isAuthenticated ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth/login" />
  );
}
