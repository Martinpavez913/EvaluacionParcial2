// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSessionContext } from "../context/sessionContext";

const ProtectedRoute = ({ children }) => {
  const { isLogged, userSession } = useSessionContext();

  if (!isLogged || userSession.role !== "admin") {
    // No está logueado o no es admin → redirigir
    return <Navigate to="/inicio-sesion" replace />;
  }

  // Usuario admin → renderizar contenido protegido
  return children;
};

export default ProtectedRoute;