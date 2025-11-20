import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ROLES } from './constants/roles';
import { ROUTES } from './routes';

// Import pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AdminPanel from './pages/AdminPanel';
import DirectorPanel from './pages/DirectorPanel';
import DispatcherPanel from './pages/DispatcherPanel';
import CourierPanel from './pages/CourierPanel';
import SpecialistPanel from './pages/SpecialistPanel';
import AccountPage from './pages/AccountPage';
import RequestPage from './pages/RequestPage';
import InfoPage from './pages/InfoPage';
import CreatedOrderPage from './pages/CreatedOrderPage';
import EmployeePage from './pages/EmployeePage';
import MaterialPage from './pages/MaterialPage';
import ManagementPage from './pages/ManagementPage';

// Import protection components
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRouter from './components/RoleProtectedRouter';
import AuthProtectedRoute from './components/AuthProtectedRoute';

// Import components
import UserProfile from './components/UserProfile';

import './App.css';

function App() {
    const { user, logout } = useAuth();

    return (
        <Router>
            <div className="app">
                <header style={{ 
                    padding: '20px', 
                    borderBottom: '1px solid #ccc', 
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ 
                        maxWidth: '1200px', 
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}>
                        <div>
                            <h1 style={{ margin: 0, color: '#333', fontSize: '1.8em' }}>
                                🚀 Система управления доставками
                            </h1>
                        </div>
                        
                        {user ? (
                            <UserProfile user={user} onLogout={logout} />
                        ) : (
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, color: '#666' }}>Не авторизован</p>
                                <a href="/auth" style={{ color: '#2196f3', textDecoration: 'none' }}>
                                    Войти в систему
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Навигация */}
                    {user && (
                        <nav style={{ 
                            marginTop: '20px',
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}>
                            <NavLink href="/" label="🏠 Главная" />
                            <NavLink href="/account" label="👤 Аккаунт" />
                            {user.role === ROLES.ADMIN && <NavLink href="/admin" label="👨‍💼 Админ" />}
                            {user.role === ROLES.DIRECTOR && <NavLink href="/director" label="👔 Директор" />}
                            {user.role === ROLES.DISPATCHER && <NavLink href="/dispatcher" label="👩‍💻 Диспетчер" />}
                            {user.role === ROLES.COURIER && <NavLink href="/courier" label="🚴 Курьер" />}
                            {user.role === ROLES.SPECIALIST && <NavLink href="/specialist" label="👩‍🔧 Специалист" />}
                            <NavLink href="/orders" label="📦 Заказы" />
                            <NavLink href="/materials" label="📋 Материалы" />
                            <NavLink href="/employees" label="👥 Сотрудники" />
                        </nav>
                    )}
                </header>
                
                <main style={{ 
                    padding: '20px',
                    minHeight: 'calc(100vh - 200px)',
                    backgroundColor: '#f8f9fa'
                }}>
                    <Routes>
                        {/* Public routes */}
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                        <Route path={ROUTES.SERVICE_INFO} element={<InfoPage />} />
                        
                        {/* Auth route - only for non-authenticated users */}
                        <Route 
                            path={ROUTES.AUTH} 
                            element={<AuthProtectedRoute element={<AuthPage />} />} 
                        />
                        
                        {/* Organization Request - public */}
                        <Route 
                            path={ROUTES.ORGANIZATION_REQUEST} 
                            element={<RequestPage />} 
                        />
                        
                        {/* Protected routes requiring authentication */}
                        <Route 
                            path={ROUTES.ACCOUNT} 
                            element={<ProtectedRoute element={<AccountPage />} />} 
                        />
                        
                        <Route 
                            path={ROUTES.CREATE_ORDER} 
                            element={<ProtectedRoute element={<CreatedOrderPage />} />} 
                        />
                        
                        {/* Role-based protected routes */}
                        <Route 
                            path={ROUTES.ADMIN_PANEL} 
                            element={<RoleProtectedRouter element={<AdminPanel />} roles={[ROLES.ADMIN]} />} 
                        />
                        
                        <Route 
                            path={ROUTES.DIRECTOR_PANEL} 
                            element={<RoleProtectedRouter element={<DirectorPanel />} roles={[ROLES.DIRECTOR]} />} 
                        />

                        <Route 
                            path="/dispatcher" 
                            element={<RoleProtectedRouter element={<DispatcherPanel />} roles={[ROLES.DISPATCHER]} />} 
                        />

                        <Route 
                            path="/courier" 
                            element={<RoleProtectedRouter element={<CourierPanel />} roles={[ROLES.COURIER]} />} 
                        />

                        <Route 
                            path="/specialist" 
                            element={<RoleProtectedRouter element={<SpecialistPanel />} roles={[ROLES.SPECIALIST]} />} 
                        />
                        
                        <Route 
                            path={ROUTES.ORDERS} 
                            element={<RoleProtectedRouter element={<DispatcherPanel />} roles={[ROLES.DIRECTOR, ROLES.COURIER, ROLES.DISPATCHER]} />} 
                        />

                        <Route 
                            path={ROUTES.EMPLOYEES_LIST} 
                            element={<RoleProtectedRouter element={<EmployeePage />} roles={[ROLES.DIRECTOR]} />} 
                        />

                        <Route 
                            path={ROUTES.MATERIAL_LIST} 
                            element={<RoleProtectedRouter element={<MaterialPage />} roles={[ROLES.DIRECTOR, ROLES.SPECIALIST]} />} 
                        />

                        <Route 
                            path={ROUTES.ORGANIZATION_MANAGEMENT} 
                            element={<RoleProtectedRouter element={<ManagementPage />} roles={[ROLES.DIRECTOR]} />} 
                        />
                        
                        {/* 404 route */}
                        <Route path="*" element={<div style={{ textAlign: 'center', padding: '50px' }}>
                            <h2>404 - Страница не найдена</h2>
                            <p>Запрошенная страница не существует.</p>
                            <a href="/">Вернуться на главную</a>
                        </div>} />
                    </Routes>
                </main>

                <footer style={{
                    padding: '20px',
                    backgroundColor: '#333',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <p>© 2024 Система управления доставками. Все права защищены.</p>
                        <p style={{ fontSize: '14px', opacity: 0.8 }}>
                            Разработано для лабораторной работы по ролевому доступу
                        </p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

const NavLink = ({ href, label }) => (
    <a 
        href={href}
        style={{
            padding: '10px 15px',
            color: '#333',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'all 0.3s ease',
            backgroundColor: 'white',
            border: '1px solid #e0e0e0'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2196f3';
            e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#333';
        }}
    >
        {label}
    </a>
);

export default App;