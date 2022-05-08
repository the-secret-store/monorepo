import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from 'styled-components';

import { Navigator } from './Navigator';
import { UnexpectedError } from './error/UnexpectedError/ErrorBoundary';
import { GlobalStyles, theme } from './theme';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary FallbackComponent={UnexpectedError}>
        <BrowserRouter>
          <Navigator />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
