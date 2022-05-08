import { Route, Routes } from 'react-router-dom';
import { LandingPage } from '../views';
import { Login } from '../views/auth';

export function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  );
}
