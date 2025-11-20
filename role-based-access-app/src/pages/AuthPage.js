import { useAuth } from '../hooks/useAuth';
import { ROLES, ROLE_NAMES, ROLE_COLORS } from '../constants/roles';

const AuthPage = () => {
    const { login } = useAuth();

    const roleData = [
        {
            role: ROLES.ADMIN,
            icon: '👨‍💼',
            description: 'Полный доступ к системе, управление пользователями',
            features: ['Управление пользователями', 'Системные настройки', 'Аналитика']
        },
        {
            role: ROLES.DIRECTOR,
            icon: '👔', 
            description: 'Управление организацией, аналитика, отчеты',
            features: ['Финансовая аналитика', 'Управление персоналом', 'Стратегическое планирование']
        },
        {
            role: ROLES.DISPATCHER,
            icon: '👩‍💻',
            description: 'Управление заказами, распределение задач',
            features: ['Создание заказов', 'Назначение курьеров', 'Отслеживание статусов']
        },
        {
            role: ROLES.COURIER,
            icon: '🚴',
            description: 'Доставка заказов, обновление статусов',
            features: ['Просмотр заданий', 'Отметка о доставке', 'Маршрутизация']
        },
        {
            role: ROLES.SPECIALIST,
            icon: '👩‍🔧',
            description: 'Работа с материалами, техническая поддержка',
            features: ['Учет материалов', 'Техническое обслуживание', 'Поддержка качества']
        }
    ];

    const handleLogin = (role) => {
        login(role);
    };

    return (
        <div style={{ 
            maxWidth: '1000px', 
            margin: '0 auto', 
            padding: '20px' 
        }}>
            <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '40px 20px',
                borderRadius: '15px'
            }}>
                <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5em' }}>🔐 Система управления</h1>
                <p style={{ fontSize: '1.2em', opacity: 0.9 }}>Выберите роль для входа в систему</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '30px'
            }}>
                {roleData.map(({ role, icon, description, features }) => (
                    <div 
                        key={role}
                        onClick={() => handleLogin(role)}
                        style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '25px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: `3px solid ${ROLE_COLORS[role]}`,
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div style={{
                            fontSize: '48px',
                            marginBottom: '15px'
                        }}>
                            {icon}
                        </div>
                        <h3 style={{ 
                            color: ROLE_COLORS[role],
                            margin: '0 0 10px 0'
                        }}>
                            {ROLE_NAMES[role]}
                        </h3>
                        <p style={{ 
                            color: '#666',
                            marginBottom: '20px',
                            lineHeight: '1.5'
                        }}>
                            {description}
                        </p>
                        <div style={{ textAlign: 'left' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Доступные функции:</h4>
                            <ul style={{ 
                                padding: '0',
                                margin: '0',
                                listStyle: 'none'
                            }}>
                                {features.map((feature, index) => (
                                    <li key={index} style={{
                                        padding: '5px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span style={{ color: ROLE_COLORS[role] }}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button style={{
                            marginTop: '20px',
                            padding: '12px 30px',
                            backgroundColor: ROLE_COLORS[role],
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            width: '100%'
                        }}>
                            Войти как {ROLE_NAMES[role]}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthPage;