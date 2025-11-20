import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const DirectorPanel = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    // Моковые данные для аналитики
    const financialData = {
        revenue: { current: 2450000, previous: 2100000, growth: 16.7 },
        orders: { current: 1245, previous: 980, growth: 27.0 },
        expenses: { current: 1560000, previous: 1420000, growth: 9.9 },
        profit: { current: 890000, previous: 680000, growth: 30.9 }
    };

    const employees = [
        { id: 1, name: 'Мария Диспетчерова', position: 'Старший диспетчер', department: 'Логистика', salary: 85000, performance: 95 },
        { id: 2, name: 'Дмитрий Курьеров', position: 'Курьер', department: 'Доставка', salary: 45000, performance: 88 },
        { id: 3, name: 'Ольга Специалистова', position: 'Технический специалист', department: 'Сервис', salary: 75000, performance: 92 },
        { id: 4, name: 'Сергей Менеджеров', position: 'Менеджер по клиентам', department: 'Продажи', salary: 65000, performance: 87 }
    ];

    const projects = [
        { id: 1, name: 'Автоматизация логистики', progress: 75, deadline: '2024-03-15', budget: 500000 },
        { id: 2, name: 'Внедрение CRM системы', progress: 30, deadline: '2024-04-20', budget: 300000 },
        { id: 3, name: 'Расширение зоны доставки', progress: 90, deadline: '2024-02-28', budget: 200000 }
    ];

    const renderOverview = () => (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <FinancialCard 
                    title="Выручка" 
                    value={financialData.revenue.current} 
                    growth={financialData.revenue.growth}
                    icon="💰"
                    color="#4caf50"
                />
                <FinancialCard 
                    title="Заказы" 
                    value={financialData.orders.current} 
                    growth={financialData.orders.growth}
                    icon="📦"
                    color="#2196f3"
                />
                <FinancialCard 
                    title="Расходы" 
                    value={financialData.expenses.current} 
                    growth={financialData.expenses.growth}
                    icon="📊"
                    color="#ff9800"
                />
                <FinancialCard 
                    title="Прибыль" 
                    value={financialData.profit.current} 
                    growth={financialData.profit.growth}
                    icon="🎯"
                    color="#9c27b0"
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
            }}>
                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    <h4 style={{ margin: '0 0 15px 0' }}>📈 Ключевые показатели</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <KPIItem label="Рентабельность" value="36.3%" trend="up" />
                        <KPIItem label="Конверсия заказов" value="24.8%" trend="up" />
                        <KPIItem label="Средний чек" value="1967 ₽" trend="stable" />
                        <KPIItem label="Удержание клиентов" value="78.5%" trend="up" />
                    </div>
                </div>

                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    <h4 style={{ margin: '0 0 15px 0' }}>🚀 Активные проекты</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {projects.map(project => (
                            <ProjectProgress key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderEmployees = () => (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Управление персоналом</h3>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    + Найм сотрудника
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
                            <th style={{ padding: '12px', textAlign: 'left' }}>Сотрудник</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Должность</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Зарплата</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Эффективность</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{emp.name}</div>
                                    <div style={{ color: '#666', fontSize: '12px' }}>{emp.department}</div>
                                </td>
                                <td style={{ padding: '12px' }}>{emp.position}</td>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>{emp.salary.toLocaleString()} ₽</td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{
                                        background: 'linear-gradient(90deg, #4caf50, #8bc34a)',
                                        width: `${emp.performance}%`,
                                        height: '8px',
                                        borderRadius: '4px',
                                        marginBottom: '5px'
                                    }}></div>
                                    <span style={{ fontSize: '12px', color: '#666' }}>{emp.performance}%</span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <button style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#2196f3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        marginRight: '5px'
                                    }}>
                                        Оценка
                                    </button>
                                    <button style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#ff9800',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}>
                                        Изменить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderStrategy = () => (
        <div>
            <h3>Стратегическое планирование</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                <StrategyCard 
                    title="📈 Рост бизнеса" 
                    goals={['Увеличить выручку на 25%', 'Выйти на новые регионы', 'Увеличить долю рынка']}
                    progress={65}
                />
                <StrategyCard 
                    title="⚡ Оптимизация" 
                    goals={['Снизить операционные расходы', 'Автоматизировать процессы', 'Улучшить качество сервиса']}
                    progress={40}
                />
                <StrategyCard 
                    title="👥 Развитие команды" 
                    goals={['Нанять 5 новых специалистов', 'Повысить квалификацию', 'Внедрить систему мотивации']}
                    progress={30}
                />
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Заголовок */}
            <div style={{
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                color: 'white',
                padding: '30px',
                borderRadius: '15px',
                marginBottom: '30px'
            }}>
                <h1 style={{ margin: '0 0 10px 0' }}>👔 Панель директора</h1>
                <p style={{ margin: 0, opacity: 0.9 }}>Управление бизнесом и стратегическое планирование</p>
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
                    { id: 'overview', label: '📊 Обзор', component: renderOverview },
                    { id: 'employees', label: '👥 Персонал', component: renderEmployees },
                    { id: 'strategy', label: '🎯 Стратегия', component: renderStrategy }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: activeTab === tab.id ? '#2196f3' : '#f8f9fa',
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
                    { id: 'overview', component: renderOverview },
                    { id: 'employees', component: renderEmployees },
                    { id: 'strategy', component: renderStrategy }
                ].find(tab => tab.id === activeTab)?.component()}
            </div>
        </div>
    );
};

const FinancialCard = ({ title, value, growth, icon, color }) => (
    <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${color}`
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ fontSize: '24px' }}>{icon}</div>
            <span style={{
                padding: '4px 8px',
                backgroundColor: growth > 0 ? '#4caf5020' : '#f4433620',
                color: growth > 0 ? '#4caf50' : '#f44336',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
            }}>
                {growth > 0 ? '+' : ''}{growth}%
            </span>
        </div>
        <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: color, marginBottom: '5px' }}>
            {value.toLocaleString()} ₽
        </div>
        <div style={{ color: '#666', fontSize: '14px' }}>{title}</div>
    </div>
);

const KPIItem = ({ label, value, trend }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
        <span style={{ color: '#666' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>{value}</span>
            <span style={{
                color: trend === 'up' ? '#4caf50' : trend === 'down' ? '#f44336' : '#ff9800',
                fontSize: '18px'
            }}>
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
            </span>
        </div>
    </div>
);

const ProjectProgress = ({ project }) => (
    <div style={{
        padding: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>{project.name}</span>
            <span style={{ fontSize: '12px', color: '#666' }}>до {project.deadline}</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
            <div style={{
                background: '#f0f0f0',
                height: '6px',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <div style={{
                    background: 'linear-gradient(90deg, #2196f3, #21cbf3)',
                    width: `${project.progress}%`,
                    height: '100%',
                    borderRadius: '3px'
                }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginTop: '5px' }}>
                <span>Прогресс: {project.progress}%</span>
                <span>Бюджет: {project.budget.toLocaleString()} ₽</span>
            </div>
        </div>
    </div>
);

const StrategyCard = ({ title, goals, progress }) => (
    <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
    }}>
        <h4 style={{ margin: '0 0 15px 0' }}>{title}</h4>
        <div style={{ marginBottom: '15px' }}>
            <div style={{
                background: '#f0f0f0',
                height: '6px',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <div style={{
                    background: 'linear-gradient(90deg, #4caf50, #8bc34a)',
                    width: `${progress}%`,
                    height: '100%',
                    borderRadius: '3px'
                }}></div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', color: '#666', marginTop: '5px' }}>
                {progress}% выполнено
            </div>
        </div>
        <ul style={{ padding: '0', margin: '0', listStyle: 'none' }}>
            {goals.map((goal, index) => (
                <li key={index} style={{
                    padding: '5px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px'
                }}>
                    <span style={{ color: '#4caf50' }}>✓</span>
                    {goal}
                </li>
            ))}
        </ul>
    </div>
);

export default DirectorPanel;