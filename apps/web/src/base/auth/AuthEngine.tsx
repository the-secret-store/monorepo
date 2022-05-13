import { createContext, useContext, useState } from 'react';
import { SessionManager } from './SessionManager';

export const AuthContext = createContext<AuthContextType>({
  session: new SessionManager(),
  auth: false,
  setAuthToken: old => old,
});

type AuthContextType = {
  session: SessionManager;
  auth: boolean;
  setAuthToken: (token: string) => void;
};

export const AuthProvider = AuthContext.Provider;

export const useAuthApi = () => useContext(AuthContext);

export function AuthEngine({ children }: AuthEngineProps) {
  const session = new SessionManager();
  const [auth, setAuth] = useState(() => session.isAuthenticated());

  function setAuthToken(token: string) {
    if (token.length === 0) {
      session.clearSession();
      setAuth(false);
    } else {
      session.setSession(token);
      setAuth(true);
    }
  }

  return <AuthProvider value={{ session, auth, setAuthToken }}>{children}</AuthProvider>;
}

interface AuthEngineProps {
  children: React.ReactNode;
}
