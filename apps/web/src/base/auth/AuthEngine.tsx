import { createContext, useContext, useState } from 'react';
import { SessionManager } from './SessionManager';

export const AuthContext = createContext<AuthContextType>({
  session: new SessionManager(),
  isAuthenticated: false,
  setAuthToken: old => old,
});

type AuthContextType = {
  session: SessionManager;
  isAuthenticated: boolean;
  setAuthToken: (token: string) => void;
};

export const AuthProvider = AuthContext.Provider;

export const useAuthApi = () => useContext(AuthContext);

export function AuthEngine({ children }: AuthEngineProps) {
  const session = new SessionManager();
  const [isAuthenticated, setAuthenticationFlag] = useState(() => session.isAuthenticated());

  function setAuthToken(token: string) {
    if (token.length === 0) {
      session.clearSession();
      setAuthenticationFlag(false);
    } else {
      session.setSession(token);
      setAuthenticationFlag(true);
    }
  }

  return <AuthProvider value={{ session, isAuthenticated, setAuthToken }}>{children}</AuthProvider>;
}

interface AuthEngineProps {
  children: React.ReactNode;
}
