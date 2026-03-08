import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  /** Which role is allowed to access these routes */
  allowedRole: UserRole;
  /** Where to redirect unauthenticated users (default: "/") */
  redirectTo?: string;
}

/**
 * Route guard that checks authentication and role.
 * Wrap dashboard route groups with this component.
 *
 * Usage in router:
 *   <Route element={<ProtectedRoute allowedRole="homeowner" />}>
 *     <Route path="/homeowner/my-jobs" element={<MyJobs />} />
 *   </Route>
 */
const ProtectedRoute = ({
  allowedRole,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  // While checking auth state, render nothing (or a spinner)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Not logged in → redirect to home (preserving intended destination)
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Logged in but wrong role → redirect to their correct dashboard
  if (user?.role !== allowedRole) {
    const fallback =
      user?.role === "homeowner" ? "/homeowner" : "/tradesperson";
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
