import { Route, Routes } from 'react-router-dom';
import { LandingPage } from '../pages/Landing';

export function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/page-2" element={<h1>Page 2</h1>} />
    </Routes>
  );
}
