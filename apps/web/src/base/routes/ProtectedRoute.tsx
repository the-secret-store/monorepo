import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { NavBar } from '$web/components';
import { useAuthApi } from '$web/hooks';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthApi();
  const location = useLocation().pathname.slice(1);

  return isAuthenticated ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to={`/auth/login?redirect=${location}`} />
  );
}
