import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ROLE_NAMES, ROLE_COLORS } from '../constants/roles';

const AdminPanel = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('users');

    // Моковые данные
    const users = [
        { id: 1, name: 'Иван Директоров', email: 'director@company.ru', role: 'DIRECTOR', status: 'active', lastLogin: '2024-01-15' },
        { id: 2, name: 'Мария Диспетчерова', email: 'dispatcher@company.ru', role: 'DISPATCHER', status: 'active', lastLogin: '2024-01-15' },
        { id: 3, name: 'Дмитрий Курьеров', email: 'courier@company.ru', role: 'COURIER', status: 'inactive', lastLogin: '2024-01-14' },
        { id: 4, name: 'Ольга Специалистова', email: 'specialist@company.ru', role: 'SPECIALIST', status: 'active', lastLogin: '2024-01-15' }
    ];

    const systemStats = {
        totalUsers: 47,
        activeSessions: 12,
        storageUsed: '2.3GB',
        uptime: '99.8%'
    };

    const renderUsersManagement = () => (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Управление пользователями</h3>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    + Добавить пользователя
                </button>
            </div>
            <div style={{
                background: 'white',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Пользователь</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Роль</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Статус</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Последний вход</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                                    <div style={{ color: '#666', fontSize: '12px' }}>{user.email}</div>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        backgroundColor: ROLE_COLORS[user.role] + '20',
                                        color: ROLE_COLORS[user.role],
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {ROLE_NAMES[user.role]}
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        backgroundColor: user.status === 'active' ? '#4caf5020' : '#f4433620',
                                        color: user.status === 'active' ? '#4caf50' : '#f44336',
                                        borderRadius: '12px',
                                        fontSize: '12px'
                                    }}>
                                        {user.status === 'active' ? 'Активен' : 'Неактивен'}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', color: '#666' }}>{user.lastLogin}</td>
                                <td style={{ padding: '12px' }}>
                                    <button style={{
                                        padding: '6px 12px',
                                        marginRight: '5px',
                                        backgroundColor: '#2196f3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}>
                                        Редактировать
                                    </button>
                                    <button style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderSystemSettings = () => (
        <div>
            <h3>Настройки системы</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                <SettingCard 
                    title="Безопасность" 
                    icon="🔒"
                    description="Настройки безопасности и доступов"
                    status="Настроено"
                />
                <SettingCard 
                    title="Уведомления" 
                    icon="🔔"
                    description="Настройка email и push уведомлений"
                    status="Требует настройки"
                />
                <SettingCard 
                    title="Резервное копирование" 
                    icon="💾"
                    description="Автоматическое резервное копирование"
                    status="Активно"
                />
                <SettingCard 
                    title="Интеграции" 
                    icon="🔗"
                    description="Внешние системы и API"
                    status="Не настроено"
                />
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div>
            <h3>Аналитика системы</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                <StatCard title="Всего пользователей" value={systemStats.totalUsers} icon="👥" color="#2196f3" />
                <StatCard title="Активные сессии" value={systemStats.activeSessions} icon="🟢" color="#4caf50" />
                <StatCard title="Использовано памяти" value={systemStats.storageUsed} icon="💾" color="#ff9800" />
                <StatCard title="Аптайм системы" value={systemStats.uptime} icon="📈" color="#9c27b0" />
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Заголовок */}
            <div style={{
                background: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
                color: 'white',
                padding: '30px',
                borderRadius: '15px',
                marginBottom: '30px'
            }}>
                <h1 style={{ margin: '0 0 10px 0' }}>👨‍💼 Панель администратора</h1>
                <p style={{ margin: 0, opacity: 0.9 }}>Полный контроль над системой и пользователями</p>
            </div>

            {/* Навигация */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '30px',
                background: 'white',
                padding: '15px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                {[
                    { id: 'users', label: '👥 Пользователи', component: renderUsersManagement },
                    { id: 'settings', label: '⚙️ Настройки', component: renderSystemSettings },
                    { id: 'analytics', label: '📊 Аналитика', component: renderAnalytics }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: activeTab === tab.id ? '#f44336' : '#f8f9fa',
                            color: activeTab === tab.id ? 'white' : '#333',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Контент */}
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                {[
                    { id: 'users', component: renderUsersManagement },
                    { id: 'settings', component: renderSystemSettings },
                    { id: 'analytics', component: renderAnalytics }
                ].find(tab => tab.id === activeTab)?.component()}
            </div>
        </div>
    );
};

const SettingCard = ({ title, icon, description, status }) => (
    <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
    }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
        <h4 style={{ margin: '0 0 8px 0' }}>{title}</h4>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0' }}>{description}</p>
        <span style={{
            padding: '4px 8px',
            backgroundColor: status === 'Активно' || status === 'Настроено' ? '#4caf5020' : '#ff980020',
            color: status === 'Активно' || status === 'Настроено' ? '#4caf50' : '#ff9800',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
        }}>
            {status}
        </span>
    </div>
);

const StatCard = ({ title, value, icon, color }) => (
    <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        borderTop: `4px solid ${color}`
    }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
        <div style={{ fontSize: '2em', fontWeight: 'bold', color: color, marginBottom: '5px' }}>
            {value}
        </div>
        <div style={{ color: '#666', fontSize: '14px' }}>{title}</div>
    </div>
);

export default AdminPanel;