import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const SpecialistPanel = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('materials');

    const materials = [
        { 
            id: 1, 
            name: 'Кабели Ethernet', 
            category: 'Сетевые компоненты',
            quantity: 45,
            minQuantity: 20,
            unit: 'шт',
            location: 'Склад A',
            supplier: 'ТехноСнаб',
            lastRestock: '2024-01-10',
            status: 'normal'
        },
        { 
            id: 2, 
            name: 'Маршрутизаторы', 
            category: 'Сетевое оборудование',
            quantity: 8,
            minQuantity: 5,
            unit: 'шт',
            location: 'Склад B',
            supplier: 'Сетевик',
            lastRestock: '2024-01-12',
            status: 'low'
        },
        { 
            id: 3, 
            name: 'Коммутаторы', 
            category: 'Сетевое оборудование',
            quantity: 15,
            minQuantity: 10,
            unit: 'шт',
            location: 'Склад A',
            supplier: 'ИТ-Комплект',
            lastRestock: '2024-01-08',
            status: 'normal'
        },
        { 
            id: 4, 
            name: 'Источники питания', 
            category: 'Комплектующие',
            quantity: 3,
            minQuantity: 5,
            unit: 'шт',
            location: 'Склад C',
            supplier: 'ЭнергоСистемы',
            lastRestock: '2024-01-05',
            status: 'critical'
        }
    ];

    const maintenanceTasks = [
        {
            id: 1,
            equipment: 'Серверная стойка #1',
            type: 'Профилактика',
            priority: 'high',
            assignedTo: 'Ольга Специалистова',
            dueDate: '2024-01-20',
            status: 'in_progress'
        },
        {
            id: 2,
            equipment: 'Маршрутизатор Core',
            type: 'Обновление ПО',
            priority: 'medium',
            assignedTo: 'Иван Техников',
            dueDate: '2024-01-25',
            status: 'planned'
        },
        {
            id: 3,
            equipment: 'Система охлаждения',
            type: 'Замена фильтров',
            priority: 'low',
            assignedTo: 'Ольга Специалистова',
            dueDate: '2024-02-01',
            status: 'planned'
        }
    ];

    const renderMaterials = () => (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>📦 Управление материалами</h3>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    + Добавить материал
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {materials.map(material => (
                    <MaterialCard key={material.id} material={material} />
                ))}
            </div>

            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <h4 style={{ margin: '0 0 15px 0' }}>📊 Статус запасов</h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px'
                }}>
                    <InventoryStat title="Всего позиций" value={materials.length} color="#2196f3" />
                    <InventoryStat title="Низкий запас" value={2} color="#ff9800" />
                    <InventoryStat title="Критический запас" value={1} color="#f44336" />
                    <InventoryStat title="В норме" value={1} color="#4caf50" />
                </div>
            </div>
        </div>
    );

    const renderMaintenance = () => (
        <div>
            <h3>🔧 Техническое обслуживание</h3>
            <div style={{
                display: 'grid',
                gap: '15px',
                marginTop: '20px'
            }}>
                {maintenanceTasks.map(task => (
                    <MaintenanceTaskCard key={task.id} task={task} />
                ))}
            </div>

            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                marginTop: '30px'
            }}>
                <h4 style={{ margin: '0 0 15px 0' }}>📋 Быстрые действия</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <QuickAction icon="➕" label="Создать задачу" />
                    <QuickAction icon="📋" label="Отчет о работах" />
                    <QuickAction icon="🔍" label="Диагностика" />
                    <QuickAction icon="📞" label="Вызов поддержки" />
                </div>
            </div>
        </div>
    );

    const renderQuality = () => (
        <div>
            <h3>🎯 Контроль качества</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                <QualityMetric 
                    title="Качество оборудования" 
                    value={94} 
                    trend="up"
                    description="Соответствие стандартам"
                />
                <QualityMetric 
                    title="Время реакции" 
                    value={88} 
                    trend="stable"
                    description="Среднее время решения проблем"
                />
                <QualityMetric 
                    title="Удовлетворенность" 
                    value={96} 
                    trend="up"
                    description="Оценки клиентов"
                />
            </div>

            <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                marginTop: '30px'
            }}>
                <h4 style={{ margin: '0 0 15px 0' }}>📝 Последние проверки</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <InspectionItem equipment="Серверная комната" date="2024-01-15" result="Успешно" />
                    <InspectionItem equipment="Сетевое оборудование" date="2024-01-14" result="Требует внимания" />
                    <InspectionItem equipment="Системы питания" date="2024-01-12" result="Успешно" />
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Заголовок */}
            <div style={{
                background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
                color: 'white',
                padding: '30px',
                borderRadius: '15px',
                marginBottom: '30px'
            }}>
                <h1 style={{ margin: '0 0 10px 0' }}>👩‍🔧 Панель специалиста</h1>
                <p style={{ margin: 0, opacity: 0.9 }}>Управление материалами и техническое обслуживание</p>
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
                    { id: 'materials', label: '📦 Материалы', component: renderMaterials },
                    { id: 'maintenance', label: '🔧 Обслуживание', component: renderMaintenance },
                    { id: 'quality', label: '🎯 Качество', component: renderQuality }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: activeTab === tab.id ? '#9c27b0' : '#f8f9fa',
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
                    { id: 'materials', component: renderMaterials },
                    { id: 'maintenance', component: renderMaintenance },
                    { id: 'quality', component: renderQuality }
                ].find(tab => tab.id === activeTab)?.component()}
            </div>
        </div>
    );
};

const MaterialCard = ({ material }) => {
    const getStatusColor = (status) => {
        const colors = {
            normal: '#4caf50',
            low: '#ff9800',
            critical: '#f44336'
        };
        return colors[status] || '#666';
    };

    const getStatusText = (status) => {
        const texts = {
            normal: 'В норме',
            low: 'Низкий запас',
            critical: 'Критический'
        };
        return texts[status] || status;
    };

    const percentage = (material.quantity / material.minQuantity) * 100;

    return (
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: `2px solid ${getStatusColor(material.status)}20`
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{material.name}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{material.category}</p>
                </div>
                <span style={{
                    padding: '4px 8px',
                    backgroundColor: getStatusColor(material.status) + '20',
                    color: getStatusColor(material.status),
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {getStatusText(material.status)}
                </span>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px' }}>Количество:</span>
                    <span style={{ fontWeight: 'bold', color: getStatusColor(material.status) }}>
                        {material.quantity} {material.unit}
                    </span>
                </div>
                <div style={{
                    background: '#f0f0f0',
                    height: '6px',
                    borderRadius: '3px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        background: `linear-gradient(90deg, ${getStatusColor(material.status)}, ${getStatusColor(material.status)}80)`,
                        width: `${Math.min(percentage, 100)}%`,
                        height: '100%',
                        borderRadius: '3px'
                    }}></div>
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Мин: {material.minQuantity} {material.unit}
                </div>
            </div>

            <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
                <div>📍 {material.location}</div>
                <div>🏢 {material.supplier}</div>
                <div>📅 Последняя поставка: {material.lastRestock}</div>
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
                    Заказать
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
                    Подробнее
                </button>
            </div>
        </div>
    );
};

const MaintenanceTaskCard = ({ task }) => {
    const getPriorityColor = (priority) => {
        const colors = {
            high: '#f44336',
            medium: '#ff9800',
            low: '#4caf50'
        };
        return colors[priority] || '#666';
    };

    const getStatusColor = (status) => {
        const colors = {
            planned: '#666',
            in_progress: '#2196f3',
            completed: '#4caf50'
        };
        return colors[status] || '#666';
    };

    return (
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${getPriorityColor(task.priority)}`
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{task.equipment}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{task.type}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{
                        padding: '4px 8px',
                        backgroundColor: getStatusColor(task.status) + '20',
                        color: getStatusColor(task.status),
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }}>
                        {task.status === 'in_progress' ? 'В работе' : task.status === 'planned' ? 'Запланировано' : 'Выполнено'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>до {task.dueDate}</div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>
                    Ответственный: {task.assignedTo}
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {task.status === 'planned' && (
                        <button style={{
                            padding: '6px 12px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}>
                            Начать
                        </button>
                    )}
                    {task.status === 'in_progress' && (
                        <button style={{
                            padding: '6px 12px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}>
                            Завершить
                        </button>
                    )}
                    <button style={{
                        padding: '6px 12px',
                        backgroundColor: '#666',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}>
                        Детали
                    </button>
                </div>
            </div>
        </div>
    );
};

const QualityMetric = ({ title, value, trend, description }) => (
    <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
    }}>
        <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#9c27b0', marginBottom: '10px' }}>
            {value}%
        </div>
        <h4 style={{ margin: '0 0 8px 0' }}>{title}</h4>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 10px 0' }}>{description}</p>
        <span style={{
            color: trend === 'up' ? '#4caf50' : trend === 'down' ? '#f44336' : '#ff9800',
            fontSize: '18px'
        }}>
            {trend === 'up' ? '↗ Улучшение' : trend === 'down' ? '↘ Снижение' : '→ Стабильно'}
        </span>
    </div>
);

const InspectionItem = ({ equipment, date, result }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        background: '#f8f9fa',
        borderRadius: '6px'
    }}>
        <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{equipment}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{date}</div>
        </div>
        <span style={{
            padding: '4px 8px',
            backgroundColor: result === 'Успешно' ? '#4caf5020' : '#ff980020',
            color: result === 'Успешно' ? '#4caf50' : '#ff9800',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
        }}>
            {result}
        </span>
    </div>
);

const QuickAction = ({ icon, label }) => (
    <button style={{
        padding: '10px 15px',
        backgroundColor: '#f8f9fa',
        color: '#333',
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px'
    }}>
        <span>{icon}</span>
        {label}
    </button>
);

const InventoryStat = ({ title, value, color }) => (
    <div style={{
        background: 'white',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        border: `1px solid ${color}20`
    }}>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: color }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{title}</div>
    </div>
);

export default SpecialistPanel;