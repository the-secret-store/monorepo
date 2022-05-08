import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Shell, ThemeEngine } from './app';
import { Home } from './views';

ReactDOM.render(
  <StrictMode>
    <ThemeEngine>
      <Shell>
        <Home />
      </Shell>
    </ThemeEngine>
  </StrictMode>,
  document.getElementById('root')
);
