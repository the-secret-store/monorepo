import { LandingPage } from '$web/views';
import { Login } from '$web/views/auth';
import { CreateProject, ProjectOverview, Projects, ShowSecretsAsJson } from '$web/views/projects';
import { TestPage } from '$web/views/Test';
import { UserSettings } from '$web/views/user';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Error404 } from './error/404';

export function NavigationEngine() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/projects" element={<Outlet />}>
        <Route index element={<Projects />} />
        <Route path="create" element={<CreateProject />} />
        <Route path=":projectId" element={<Outlet />}>
          <Route index element={<ProjectOverview />} />
          <Route path="show-secrets-as-json" element={<ShowSecretsAsJson />} />
        </Route>
      </Route>

      <Route path="/user" element={<Outlet />}>
        <Route path="settings" element={<UserSettings />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
