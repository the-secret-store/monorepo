import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from 'styled-components';

import { NavigationEngine } from './NavigationEngine';
import { UnexpectedError } from './error/UnexpectedError/ErrorBoundary';
import { GlobalStyles, theme } from './theme';
import { AuthEngine } from './auth';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary FallbackComponent={UnexpectedError}>
        <AuthEngine>
          <BrowserRouter>
            <NavigationEngine />
          </BrowserRouter>
        </AuthEngine>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
