import { useAuth } from '../hooks/useAuth';
import { ROLE_NAMES, ROLE_COLORS } from '../constants/roles';

const HomePage = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Активные заказы', value: '24', color: '#4caf50' },
        { label: 'Новые заявки', value: '8', color: '#2196f3' },
        { label: 'Выполнено сегодня', value: '15', color: '#ff9800' },
        { label: 'Всего пользователей', value: '47', color: '#9c27b0' }
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Приветствие */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '40px',
                borderRadius: '15px',
                marginBottom: '30px',
                textAlign: 'center'
            }}>
                <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5em' }}>
                    {user ? `Добро пожаловать, ${user.name}!` : 'Добро пожаловать в систему!'}
                </h1>
                <p style={{ fontSize: '1.2em', opacity: 0.9 }}>
                    {user ? `Вы вошли как ${ROLE_NAMES[user.role]}` : 'Выберите роль для начала работы'}
                </p>
            </div>

            {/* Статистика */}
            {user && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{
                            background: 'white',
                            padding: '25px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            textAlign: 'center',
                            borderTop: `4px solid ${stat.color}`
                        }}>
                            <div style={{
                                fontSize: '2em',
                                fontWeight: 'bold',
                                color: stat.color,
                                marginBottom: '8px'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ color: '#666' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Быстрый доступ */}
            {user && (
                <div style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ marginBottom: '20px', color: '#333' }}>⚡ Быстрый доступ</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '15px'
                    }}>
                        <QuickAction icon="📊" label="Отчеты" color="#4caf50" />
                        <QuickAction icon="📋" label="Заказы" color="#2196f3" />
                        <QuickAction icon="👥" label="Клиенты" color="#ff9800" />
                        <QuickAction icon="📦" label="Инвентарь" color="#9c27b0" />
                        <QuickAction icon="⚙️" label="Настройки" color="#607d8b" />
                        <QuickAction icon="🔔" label="Уведомления" color="#f44336" />
                    </div>
                </div>
            )}

            {/* Информация для неавторизованных */}
            {!user && (
                <div style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚀</div>
                    <h2 style={{ color: '#333', marginBottom: '15px' }}>Начните работу с системой</h2>
                    <p style={{ color: '#666', fontSize: '1.1em', lineHeight: '1.6' }}>
                        Выберите одну из доступных ролей для входа в систему и получения доступа к функциям управления.
                        Каждая роль предоставляет уникальный набор возможностей для эффективной работы.
                    </p>
                </div>
            )}
        </div>
    );
};

const QuickAction = ({ icon, label, color }) => (
    <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `2px solid ${color}20`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
        <div style={{ 
            fontWeight: 'bold', 
            color: color,
            fontSize: '14px'
        }}>
            {label}
        </div>
    </div>
);

export default HomePage;