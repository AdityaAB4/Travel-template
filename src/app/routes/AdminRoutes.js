import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/auth" />;
  if (!user.isAdmin) return <Navigate to="/unauthorized" />;

  return children;
};

export default AdminRoute;
