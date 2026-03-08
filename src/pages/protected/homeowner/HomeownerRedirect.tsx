import { Navigate } from "react-router-dom";

const HomeownerRedirect = () => {
  return <Navigate to="/homeowner/my-jobs" replace />;
};

export default HomeownerRedirect;
