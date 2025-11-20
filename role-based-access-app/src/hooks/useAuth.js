import { useState, useEffect } from 'react';
import { ROLES } from '../constants/roles';

export const useAuth = () => {
    const [role, setRoleState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const savedRole = localStorage.getItem('userRole');
                if (savedRole) {
                    setRoleState(savedRole);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const setRole = (newRole) => {
        setRoleState(newRole);
        localStorage.setItem('userRole', newRole);
    };

    const removeRole = () => {
        setRoleState(null);
        localStorage.removeItem('userRole');
    };

    const getRole = () => {
        return role;
    };

    const checkRole = (roleName) => {
        return role === roleName;
    };

    const checkAuth = () => {
        return !!role;
    };

    const getToken = () => {
        return 'test-token-' + Date.now();
    };

    const getTestUserData = () => {
        return {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            role: role,
            organization: 'Test Organization'
        };
    };

    return {
        isAuth: checkAuth(),
        isLoading,
        role,
        setRole,
        removeRole,
        getRole,
        checkRole,
        checkAuth,
        getToken,
        getTestUserData
    };
};