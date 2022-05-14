import { Outlet, Route, Routes } from 'react-router-dom';
import { LandingPage } from '../views';
import { Login } from '../views/auth';
import { ProjectOverview, Projects } from '../views/projects';
import { TestPage } from '../views/Test';
import { Error404 } from './error/404';

export function NavigationEngine() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/projects" element={<Outlet />}>
        <Route index element={<Projects />} />
        <Route path=":projectId" element={<ProjectOverview />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
