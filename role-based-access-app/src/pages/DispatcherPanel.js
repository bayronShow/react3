import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const DispatcherPanel = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');

    const orders = [
        { id: 1001, customer: 'Иван Петров', address: 'ул. Ленина, 15', status: 'new', priority: 'high', courier: null, createdAt: '2024-01-15 09:30' },
        { id: 1002, customer: 'Мария Сидорова', address: 'пр. Мира, 42', status: 'assigned', priority: 'medium', courier: 'Дмитрий Курьеров', createdAt: '2024-01-15 10:15' },
        { id: 1003, customer: 'Алексей Козлов', address: 'ул. Садовая, 7', status: 'in_progress', priority: 'low', courier: 'Сергей Доставкин', createdAt: '2024-01-15 08:45' },
        { id: 1004, customer: 'Ольга Новикова', address: 'ул. Центральная, 123', status: 'new', priority: 'high', courier: null, createdAt: '2024-01-15 11:20' }
    ];

    const couriers = [
        { id: 1, name: 'Дмитрий Курьеров', status: 'available', currentOrders: 2, rating: 4.8 },
        { id: 2, name: 'Сергей Доставкин', status: 'busy', currentOrders: 4, rating: 4.9 },
        { id: 3, name: 'Анна Быстрая', status: 'available', currentOrders: 1, rating: 4.7 },
        { id: 4, name: 'Михаил Оперативный', status: 'offline', currentOrders: 0, rating: 4.6 }
    ];

    const renderOrders = () => (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Управление заказами</h3>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    + Создать заказ
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                {orders.map(order => (
                    <OrderCard key={order.id} order={order} couriers={couriers} />
                ))}
            </div>
        </div>
    );

    const renderCouriers = () => (
        <div>
            <h3>Управление курьерами</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                {couriers.map(courier => (
                    <CourierCard key={courier.id} courier={courier} />
                ))}
            </div>
        </div>
    );

    const renderMap = () => (
        <div>
            <h3>Карта доставок</h3>
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center',
                marginTop: '20px'
            }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🗺️</div>
                <h4 style={{ color: '#666' }}>Интерактивная карта доставок</h4>
                <p style={{ color: '#999' }}>Здесь будет отображаться карта с маршрутами курьеров и статусами заказов</p>
                <button style={{
                    padding: '12px 24px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '15px'
                }}>
                    Открыть карту
                </button>
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Заголовок */}
            <div style={{
                background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                color: 'white',
                padding: '30px',
                borderRadius: '15px',
                marginBottom: '30px'
            }}>
                <h1 style={{ margin: '0 0 10px 0' }}>👩‍💻 Панель диспетчера</h1>
                <p style={{ margin: 0, opacity: 0.9 }}>Управление заказами и распределение задач</p>
            </div>

            {/* Статистика */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <StatCard title="Новые заказы" value="8" icon="🆕" color="#ff9800" />
                <StatCard title="В работе" value="12" icon="🚚" color="#2196f3" />
                <StatCard title="Выполнено" value="24" icon="✅" color="#4caf50" />
                <StatCard title="Активные курьеры" value="3" icon="👥" color="#9c27b0" />
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
                    { id: 'orders', label: '📦 Заказы', component: renderOrders },
                    { id: 'couriers', label: '🚴 Курьеры', component: renderCouriers },
                    { id: 'map', label: '🗺️ Карта', component: renderMap }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: activeTab === tab.id ? '#4caf50' : '#f8f9fa',
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
                    { id: 'orders', component: renderOrders },
                    { id: 'couriers', component: renderCouriers },
                    { id: 'map', component: renderMap }
                ].find(tab => tab.id === activeTab)?.component()}
            </div>
        </div>
    );
};

const OrderCard = ({ order, couriers }) => {
    const getStatusColor = (status) => {
        const colors = {
            new: '#ff9800',
            assigned: '#2196f3',
            in_progress: '#9c27b0',
            delivered: '#4caf50',
            cancelled: '#f44336'
        };
        return colors[status] || '#666';
    };

    const getStatusText = (status) => {
        const texts = {
            new: 'Новый',
            assigned: 'Назначен',
            in_progress: 'В доставке',
            delivered: 'Доставлен',
            cancelled: 'Отменен'
        };
        return texts[status] || status;
    };

    const getPriorityColor = (priority) => {
        const colors = {
            high: '#f44336',
            medium: '#ff9800',
            low: '#4caf50'
        };
        return colors[priority] || '#666';
    };

    return (
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>Заказ #{order.id}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{order.customer}</p>
                </div>
                <span style={{
                    padding: '4px 8px',
                    backgroundColor: getStatusColor(order.status) + '20',
                    color: getStatusColor(order.status),
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {getStatusText(order.status)}
                </span>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                    <strong>Адрес:</strong> {order.address}
                </p>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                    <strong>Создан:</strong> {order.createdAt}
                </p>
                <p style={{ margin: 0, fontSize: '14px' }}>
                    <strong>Приоритет:</strong> 
                    <span style={{
                        color: getPriorityColor(order.priority),
                        fontWeight: 'bold',
                        marginLeft: '5px'
                    }}>
                        {order.priority === 'high' ? 'Высокий' : order.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                </p>
            </div>

            {order.courier && (
                <div style={{
                    padding: '10px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '5px',
                    marginBottom: '15px'
                }}>
                    <strong>Курьер:</strong> {order.courier}
                </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
                {order.status === 'new' && (
                    <button style={{
                        padding: '8px 16px',
                        backgroundColor: '#2196f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        flex: 1
                    }}>
                        Назначить курьера
                    </button>
                )}
                <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}>
                    Детали
                </button>
            </div>
        </div>
    );
};

const CourierCard = ({ courier }) => {
    const getStatusColor = (status) => {
        const colors = {
            available: '#4caf50',
            busy: '#ff9800',
            offline: '#666'
        };
        return colors[status] || '#666';
    };

    const getStatusText = (status) => {
        const texts = {
            available: 'Доступен',
            busy: 'Занят',
            offline: 'Не в сети'
        };
        return texts[status] || status;
    };

    return (
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{courier.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>⭐ {courier.rating}</span>
                        <span style={{ color: '#666' }}>•</span>
                        <span style={{ color: '#666', fontSize: '14px' }}>
                            {courier.currentOrders} заказов
                        </span>
                    </div>
                </div>
                <span style={{
                    padding: '4px 8px',
                    backgroundColor: getStatusColor(courier.status) + '20',
                    color: getStatusColor(courier.status),
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {getStatusText(courier.status)}
                </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    flex: 1
                }}>
                    Назначить заказ
                </button>
                <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}>
                    Профиль
                </button>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
    }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
        <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: color, marginBottom: '5px' }}>
            {value}
        </div>
        <div style={{ color: '#666', fontSize: '14px' }}>{title}</div>
    </div>
);

export default DispatcherPanel;