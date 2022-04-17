import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeEngine } from './app';
import { Home } from './views';

ReactDOM.render(
  <StrictMode>
    <ThemeEngine>
      <Home />
    </ThemeEngine>
  </StrictMode>,
  document.getElementById('root')
);
