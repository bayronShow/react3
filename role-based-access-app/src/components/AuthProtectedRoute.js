import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes";

const AuthProtectedRoute = ({ element }) => {
    const { checkAuth } = useAuth();
    return !checkAuth() ? element : <Navigate to={ROUTES.HOME} replace />;
};

export default AuthProtectedRoute;