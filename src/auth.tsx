import { createContext, ReactNode, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const authContext = createContext({});

export default function useAuth() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('currentUser'));

  return {
    authed,
    login: () => {
      return new Promise(res => {
        setAuthed(true);
        res(null);
      });
    },
    logout: () => {
      return new Promise(res => {
        setAuthed(false);
        res(null);
      });
    },
  };
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { authed } = useAuth();
  return authed === true ? children : <Navigate to="/login" replace />;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function AuthConsumer() {
  return useContext(authContext);
}
