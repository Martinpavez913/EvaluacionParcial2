// src/context/SessionContext.jsx
import { createContext, useContext } from "react";
import { useSession } from "../hooks/useSession";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const session = useSession();
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
