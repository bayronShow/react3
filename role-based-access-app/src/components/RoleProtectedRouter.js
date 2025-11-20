import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routes";

const RoleProtectedRouter = ({ element, roles }) => {
    const { checkAuth, getTestUserData } = useAuth();
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAccountData = async () => {
            try {
                const userData = getTestUserData();
                setAccountData(userData);
            } catch (err) {
                console.error('Error fetching account data:', err);
            } finally {
                setLoading(false);
            }
        };

        getAccountData();
    }, [getTestUserData]);

    if (loading) return <div className="loading_bar">Loading...</div>;

    const hasAccess = checkAuth() && roles.some(role => role === accountData?.role);
    
    return hasAccess ? element : <Navigate to={ROUTES.HOME} replace />;
};

export default RoleProtectedRouter;