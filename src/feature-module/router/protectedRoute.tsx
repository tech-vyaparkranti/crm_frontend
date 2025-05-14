import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
