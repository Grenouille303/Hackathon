import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../src/contexts/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    ); // spinner

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />; // Affiche le composant qu'on cherche à atteindre
}
