import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes";

const ProtectedRoute = ({ element }) => {
    const { checkAuth } = useAuth();
    return checkAuth() ? element : <Navigate to={ROUTES.AUTH} replace />;
};

export default ProtectedRoute;