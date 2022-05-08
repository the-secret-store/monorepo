import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Shell, ThemeEngine } from './app';
import { Home } from './views';

ReactDOM.render(
  <StrictMode>
    <Shell>
      <ThemeEngine>
        <Home />
      </ThemeEngine>
    </Shell>
  </StrictMode>,
  document.getElementById('root')
);
