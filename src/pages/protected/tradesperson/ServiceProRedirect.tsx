import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/**
 * /tradesperson → /tradesperson/:username (public profile)
 * Falls back to /tradesperson/profile if no username is set.
 */
const ServiceProRedirect = () => {
  const { user } = useAuth();
  const target = user?.username
    ? `/tradesperson/${user.username}`
    : "/tradesperson/profile";

  return <Navigate to={target} replace />;
};

export default ServiceProRedirect;
