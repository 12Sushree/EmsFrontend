import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleRedirect() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        <div className="text-center">
          <p className="text-slate-500 animate-pulse">Redirecting.....</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "Manager") {
    return <Navigate to="/manager" replace />;
  }

  if (user.role === "Employee") {
    return <Navigate to="/employee" replace />;
  }

  return <Navigate to="/" replace />;
}
