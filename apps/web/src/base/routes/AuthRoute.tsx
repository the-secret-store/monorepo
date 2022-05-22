import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthApi } from '$web/hooks';
import { PersistentStorageManager } from '$web/util';

export function AuthRoute() {
  const { isAuthenticated } = useAuthApi();

  let redirect = new URLSearchParams(useLocation().search).get('redirect');

  if (redirect) PersistentStorageManager.setProperty('redirect', redirect);
  else {
    redirect = PersistentStorageManager.getProperty('redirect') as string;
    PersistentStorageManager.removeProperty('redirect');
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to={redirect ?? '/projects'} />;
}
