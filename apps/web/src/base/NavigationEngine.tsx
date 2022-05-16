import { LandingPage } from '$web/views';
import { Login } from '$web/views/auth';
import {
  CreateProject,
  InviteUserPage,
  ProjectOverview,
  Projects,
  ProjectSettings,
  ShowSecretsAsJson,
} from '$web/views/projects';
import { TestPage } from '$web/views/Test';
import { AcceptInvite, UserSettings } from '$web/views/user';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Error404 } from './error/404';
import { AuthRoute, ProtectedRoute } from './routes';

export function NavigationEngine() {
  return (
    <Routes>
      <Route element={<AuthRoute redirect='/projects' />}>
        <Route path='/auth/login' element={<Login />} />
      </Route>

      <Route index element={<LandingPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/projects' element={<Outlet />}>
          <Route index element={<Projects />} />
          <Route path='create' element={<CreateProject />} />
          <Route path=':projectId' element={<Outlet />}>
            <Route index element={<ProjectOverview />} />
            <Route path='settings' element={<ProjectSettings />} />
            <Route path='invite' element={<InviteUserPage />} />
            <Route path='show-secrets-as-json' element={<ShowSecretsAsJson />} />
          </Route>
        </Route>

        <Route path='/user' element={<Outlet />}>
          <Route path='settings' element={<UserSettings />} />
        </Route>

        <Route path='/invitation' element={<Outlet />}>
          <Route path='accept/:invitationId' element={<AcceptInvite />} />
        </Route>
      </Route>

      <Route path='/test' element={<TestPage />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}
