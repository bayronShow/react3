import { useState, useEffect } from 'react';
import { ROLES } from '../constants/roles';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const savedUser = localStorage.getItem('userData');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (role, userData = {}) => {
        const userInfo = {
            id: Date.now(),
            name: userData.name || getDefaultName(role),
            email: userData.email || getDefaultEmail(role),
            role: role,
            organization: userData.organization || 'ТехноПром Сервис',
            avatar: userData.avatar || getDefaultAvatar(role),
            ...userData
        };
        setUser(userInfo);
        localStorage.setItem('userData', JSON.stringify(userInfo));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userData');
    };

    const getDefaultName = (role) => {
        const names = {
            [ROLES.ADMIN]: 'Алексей Админов',
            [ROLES.DIRECTOR]: 'Иван Директоров',
            [ROLES.DISPATCHER]: 'Мария Диспетчерова',
            [ROLES.COURIER]: 'Дмитрий Курьеров',
            [ROLES.SPECIALIST]: 'Ольга Специалистова'
        };
        return names[role] || 'Пользователь';
    };

    const getDefaultEmail = (role) => {
        return `${role.toLowerCase()}@technoprom.ru`;
    };

    const getDefaultAvatar = (role) => {
        const avatars = {
            [ROLES.ADMIN]: '👨‍💼',
            [ROLES.DIRECTOR]: '👔',
            [ROLES.DISPATCHER]: '👩‍💻',
            [ROLES.COURIER]: '🚴',
            [ROLES.SPECIALIST]: '👩‍🔧'
        };
        return avatars[role] || '👤';
    };

    const checkRole = (roleName) => {
        return user?.role === roleName;
    };

    const checkAuth = () => {
        return !!user;
    };

    const getTestUserData = () => {
        return user || {
            id: 1,
            name: 'Тестовый Пользователь',
            email: 'test@example.com',
            role: null,
            organization: 'Тестовая Организация'
        };
    };

    return {
        user,
        isAuth: checkAuth(),
        isLoading,
        login,
        logout,
        getRole: () => user?.role,
        checkRole,
        checkAuth,
        getTestUserData
    };
};