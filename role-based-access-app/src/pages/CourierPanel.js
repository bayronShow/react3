import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const CourierPanel = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('tasks');

    const currentTasks = [
        { 
            id: 1001, 
            customer: 'Иван Петров', 
            address: 'ул. Ленина, 15, кв. 42', 
            phone: '+7 (912) 345-67-89',
            status: 'in_progress',
            priority: 'high',
            estimatedTime: '15:30',
            distance: '2.3 км',
            notes: 'Код домофона: 42K',
            items: ['Документы', 'Мелкий пакет']
        },
        { 
            id: 1002, 
            customer: 'Мария Сидорова', 
            address: 'пр. Мира, 42, офис 5', 
            phone: '+7 (912) 987-65-43',
            status: 'assigned',
            priority: 'medium',
            estimatedTime: '16:15',
            distance: '3.1 км',
            notes: 'Предупредить о звонке за 10 минут',
            items: ['Коробка с оборудованием', 'Документы']
        }
    ];

    const completedTasks = [
        { 
            id: 1000, 
            customer: 'Алексей Козлов', 
            address: 'ул. Садовая, 7', 
            completedAt: '2024-01-15 14:20',
            rating: 5,
            earnings: 250
        },
        { 
            id: 999, 
            customer: 'Ольга Новикова', 
            address: 'ул. Центральная, 123', 
            completedAt: '2024-01-15 13:45',
            rating: 4,
            earnings: 180
        }
    ];

    const stats = {
        todayEarnings: 1250,
        completedToday: 8,
        averageRating: 4.8,
        onlineTime: '6ч 25м'
    };

    const renderTasks = () => (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h3>🚚 Текущие задания</h3>
                <div style={{
                    display: 'grid',
                    gap: '20px',
                    marginTop: '20px'
                }}>
                    {currentTasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>

            <div>
                <h3>✅ Выполненные задания</h3>
                <div style={{
                    display: 'grid',
                    gap: '15px',
                    marginTop: '20px'
                }}>
                    {completedTasks.map(task => (
                        <CompletedTaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    );

    const renderMap = () => (
        <div>
            <h3>🗺️ Маршрут доставки</h3>
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center',
                marginTop: '20px'
            }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📍</div>
                <h4 style={{ color: '#666' }}>Оптимальный маршрут построен</h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                    margin: '20px 0'
                }}>
                    <RoutePoint time="14:45" address="ул. Ленина, 15" status="current" />
                    <RoutePoint time="15:30" address="пр. Мира, 42" status="next" />
                    <RoutePoint time="16:15" address="ул. Садовая, 28" status="future" />
                </div>
                <p style={{ color: '#999', marginBottom: '20px' }}>
                    Общее расстояние: 5.4 км • Примерное время: 1ч 30м
                </p>
                <button style={{
                    padding: '12px 24px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px'
                }}>
                    Начать маршрут
                </button>
                <button style={{
                    padding: '12px 24px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Обновить маршрут
                </button>
            </div>
        </div>
    );

    const renderStats = () => (
        <div>
            <h3>📊 Моя статистика</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                margin: '20px 0'
            }}>
                <StatCard title="Заработок сегодня" value={`${stats.todayEarnings} ₽`} icon="💰" color="#4caf50" />
                <StatCard title="Выполнено заказов" value={stats.completedToday} icon="✅" color="#2196f3" />
                <StatCard title="Рейтинг" value={stats.averageRating} icon="⭐" color="#ff9800" />
                <StatCard title="Время онлайн" value={stats.onlineTime} icon="⏱️" color="#9c27b0" />
            </div>

            <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                marginTop: '20px'
            }}>
                <h4 style={{ margin: '0 0 20px 0' }}>🎯 Цели на день</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <GoalItem goal="Выполнить 12 заказов" completed={8} total={12} color="#4caf50" />
                    <GoalItem goal="Заработать 1500 ₽" completed={1250} total={1500} color="#2196f3" />
                    <GoalItem goal="Поддержать рейтинг 4.8+" completed={4.8} total={5} color="#ff9800" />
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Заголовок */}
            <div style={{
                background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                color: 'white',
                padding: '30px',
                borderRadius: '15px',
                marginBottom: '30px'
            }}>
                <h1 style={{ margin: '0 0 10px 0' }}>🚴 Панель курьера</h1>
                <p style={{ margin: 0, opacity: 0.9 }}>Управление доставками и маршрутами</p>
            </div>

            {/* Быстрая статистика */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginBottom: '30px'
            }}>
                <QuickStat title="Активные" value={currentTasks.length} />
                <QuickStat title="На сегодня" value={currentTasks.length + 3} />
                <QuickStat title="Выполнено" value={completedTasks.length} />
                <QuickStat title="Рейтинг" value="4.8" />
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
                    { id: 'tasks', label: '📋 Задания', component: renderTasks },
                    { id: 'map', label: '🗺️ Маршрут', component: renderMap },
                    { id: 'stats', label: '📊 Статистика', component: renderStats }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: activeTab === tab.id ? '#ff9800' : '#f8f9fa',
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
                    { id: 'tasks', component: renderTasks },
                    { id: 'map', component: renderMap },
                    { id: 'stats', component: renderStats }
                ].find(tab => tab.id === activeTab)?.component()}
            </div>
        </div>
    );
};

const TaskCard = ({ task }) => {
    const getStatusColor = (status) => {
        const colors = {
            assigned: '#2196f3',
            in_progress: '#9c27b0',
            delivered: '#4caf50'
        };
        return colors[status] || '#666';
    };

    const getStatusText = (status) => {
        const texts = {
            assigned: 'Назначен',
            in_progress: 'В процессе',
            delivered: 'Доставлен'
        };
        return texts[status] || status;
    };

    return (
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '2px solid #e0e0e0'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>Заказ #{task.id}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{task.customer}</p>
                </div>
                <span style={{
                    padding: '4px 8px',
                    backgroundColor: getStatusColor(task.status) + '20',
                    color: getStatusColor(task.status),
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {getStatusText(task.status)}
                </span>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                    <strong>📍 Адрес:</strong> {task.address}
                </p>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                    <strong>📞 Телефон:</strong> {task.phone}
                </p>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                    <strong>⏰ Время:</strong> {task.estimatedTime} • {task.distance}
                </p>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                    <strong>📝 Примечания:</strong> {task.notes}
                </p>
                <p style={{ margin: 0, fontSize: '14px' }}>
                    <strong>📦 Содержимое:</strong> {task.items.join(', ')}
                </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                {task.status === 'assigned' && (
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        flex: 1
                    }}>
                        Принять в работу
                    </button>
                )}
                {task.status === 'in_progress' && (
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        flex: 1
                    }}>
                        Отметить доставку
                    </button>
                )}
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Позвонить
                </button>
            </div>
        </div>
    );
};

const CompletedTaskCard = ({ task }) => (
    <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <div style={{ fontWeight: 'bold' }}>Заказ #{task.id}</div>
                <div style={{ color: '#666', fontSize: '12px' }}>{task.customer} • {task.address}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: '#4caf50' }}>+{task.earnings} ₽</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                    <span>⭐ {task.rating}/5</span>
                    <span style={{ color: '#666' }}>•</span>
                    <span style={{ color: '#666' }}>{task.completedAt}</span>
                </div>
            </div>
        </div>
    </div>
);

const RoutePoint = ({ time, address, status }) => {
    const getStatusColor = () => {
        const colors = {
            current: '#4caf50',
            next: '#2196f3',
            future: '#666'
        };
        return colors[status] || '#666';
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '15px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(),
                border: status === 'current' ? '2px solid #4caf50' : 'none'
            }}></div>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{time}</div>
                <div style={{ color: '#666', fontSize: '12px' }}>{address}</div>
            </div>
            {status === 'current' && (
                <span style={{
                    padding: '4px 8px',
                    backgroundColor: '#4caf5020',
                    color: '#4caf50',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                }}>
                    Текущая
                </span>
            )}
        </div>
    );
};

const GoalItem = ({ goal, completed, total, color }) => {
    const percentage = (completed / total) * 100;
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px' }}>{goal}</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color }}>
                    {completed}/{total}
                </span>
            </div>
            <div style={{
                background: '#f0f0f0',
                height: '6px',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <div style={{
                    background: `linear-gradient(90deg, ${color}, ${color}80)`,
                    width: `${percentage}%`,
                    height: '100%',
                    borderRadius: '3px',
                    transition: 'width 0.3s ease'
                }}></div>
            </div>
        </div>
    );
};

const QuickStat = ({ title, value }) => (
    <div style={{
        background: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
    }}>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#ff9800' }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{title}</div>
    </div>
);

const StatCard = ({ title, value, icon, color }) => (
    <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        borderTop: `4px solid ${color}`
    }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: color, marginBottom: '5px' }}>
            {value}
        </div>
        <div style={{ color: '#666', fontSize: '14px' }}>{title}</div>
    </div>
);

export default CourierPanel;