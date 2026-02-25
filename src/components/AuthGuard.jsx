import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AuthGuard() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        <div className="text-center">
          <p className="text-slate-500 animate-pulse">
            Checking Authentication.....
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
