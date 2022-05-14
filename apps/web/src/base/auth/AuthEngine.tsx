import { createContext, useContext, useState } from 'react';
import { SessionManager } from './SessionManager';

export const AuthContext = createContext<AuthContextType>({
  session: new SessionManager(),
  isAuthenticated: false,
  setAuthToken: old => old,
  logout: () => null,
});

type AuthContextType = {
  session: SessionManager;
  isAuthenticated: boolean;
  setAuthToken: (token: string) => void;
  logout: () => void;
};

export const AuthProvider = AuthContext.Provider;

export const useAuthApi = () => useContext(AuthContext);

export function AuthEngine({ children }: AuthEngineProps) {
  const session = new SessionManager();
  const [isAuthenticated, setAuthenticationFlag] = useState(() => session.isAuthenticated());

  const setAuthToken = (token: string) => {
    session.setSession(token);
    setAuthenticationFlag(true);
  };

  const logout = () => {
    session.clearSession();
    setAuthenticationFlag(false);
  };

  return (
    <AuthProvider value={{ session, isAuthenticated, setAuthToken, logout }}>
      {children}
    </AuthProvider>
  );
}

interface AuthEngineProps {
  children: React.ReactNode;
}
