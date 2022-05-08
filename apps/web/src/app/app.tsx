import styled from 'styled-components';
import NxWelcome from './nx-welcome';

import { Route, Link, Routes } from 'react-router-dom';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <br />
      <hr />
      <br />
      <nav role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<NxWelcome title="web" />} />
        <Route path="/page-2" element={<NxWelcome title="page 2" />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
