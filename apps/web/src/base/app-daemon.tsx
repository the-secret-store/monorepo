import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer position='bottom-center' theme='dark' />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
