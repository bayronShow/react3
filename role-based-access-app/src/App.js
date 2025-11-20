import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ROLES } from './constants/roles';
import { ROUTES } from './routes';

// Import pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AdminPanel from './pages/AdminPanel';
import DirectorPanel from './pages/DirectorPanel';
import OrdersPage from './pages/OrdersPage';
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

import './App.css';

function App() {
    const { role, removeRole } = useAuth();

    const handleLogout = () => {
        removeRole();
        window.location.href = '/';
    };

    return (
        <Router>
            <div className="app">
                <header style={{ padding: '20px', borderBottom: '1px solid #ccc', backgroundColor: '#f5f5f5' }}>
                    <h1>Role-Based Access Control Demo</h1>
                    <p><strong>Current role: {role || 'Not authenticated'}</strong></p>
                    <nav style={{ marginTop: '10px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <a href="/" style={{ padding: '8px 12px', textDecoration: 'none', color: 'blue' }}>Home</a>
                        <a href="/auth" style={{ padding: '8px 12px', textDecoration: 'none', color: 'blue' }}>Auth</a>
                        <a href="/account" style={{ padding: '8px 12px', textDecoration: 'none', color: 'blue' }}>Account</a>
                        <a href="/admin" style={{ padding: '8px 12px', textDecoration: 'none', color: 'blue' }}>Admin Panel</a>
                        <a href="/director" style={{ padding: '8px 12px', textDecoration: 'none', color: 'blue' }}>Director Panel</a>
                        <a href="/orders" style={{ padding: '8px 12px', textDecoration: 'none', color: 'blue' }}>Orders</a>
                        <a href="/employees" style={{ padding: '8px 12px', textDecoration: 'none', color: 'blue' }}>Employees</a>
                        <a href="/materials" style={{ padding: '8px 12px', textDecoration: 'none', color: 'blue' }}>Materials</a>
                        <a href="/organization-management" style={{ padding: '8px 12px', textDecoration: 'none', color: 'blue' }}>Management</a>
                        {role && (
                            <button 
                                onClick={handleLogout}
                                style={{ padding: '8px 12px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Logout
                            </button>
                        )}
                    </nav>
                </header>
                
                <main style={{ padding: '20px' }}>
                    <Routes>
                        {/* Public routes */}
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                        <Route path={ROUTES.SERVICE_INFO} element={<InfoPage />} />
                        
                        {/* Auth route - only for non-authenticated users */}
                        <Route 
                            path={ROUTES.AUTH} 
                            element={
                                <AuthProtectedRoute element={<AuthPage />} />
                            } 
                        />
                        
                        {/* Organization Request - public */}
                        <Route 
                            path={ROUTES.ORGANIZATION_REQUEST} 
                            element={<RequestPage />} 
                        />
                        
                        {/* Protected routes requiring authentication */}
                        <Route 
                            path={ROUTES.ACCOUNT} 
                            element={
                                <ProtectedRoute element={<AccountPage />} />
                            } 
                        />
                        
                        <Route 
                            path={ROUTES.CREATE_ORDER} 
                            element={
                                <ProtectedRoute element={<CreatedOrderPage />} />
                            } 
                        />
                        
                        {/* Role-based protected routes */}
                        <Route 
                            path={ROUTES.ADMIN_PANEL} 
                            element={
                                <RoleProtectedRouter 
                                    element={<AdminPanel />} 
                                    roles={[ROLES.ADMIN]} 
                                />
                            } 
                        />
                        
                        <Route 
                            path={ROUTES.DIRECTOR_PANEL} 
                            element={
                                <RoleProtectedRouter 
                                    element={<DirectorPanel />} 
                                    roles={[ROLES.DIRECTOR]} 
                                />
                            } 
                        />
                        
                        <Route 
                            path={ROUTES.ORDERS} 
                            element={
                                <RoleProtectedRouter 
                                    element={<OrdersPage />} 
                                    roles={[ROLES.DIRECTOR, ROLES.COURIER, ROLES.DISPATCHER]} 
                                />
                            } 
                        />

                        <Route 
                            path={ROUTES.EMPLOYEES_LIST} 
                            element={
                                <RoleProtectedRouter 
                                    element={<EmployeePage />} 
                                    roles={[ROLES.DIRECTOR]} 
                                />
                            } 
                        />

                        <Route 
                            path={ROUTES.MATERIAL_LIST} 
                            element={
                                <RoleProtectedRouter 
                                    element={<MaterialPage />} 
                                    roles={[ROLES.DIRECTOR, ROLES.SPECIALIST]} 
                                />
                            } 
                        />

                        <Route 
                            path={ROUTES.ORGANIZATION_MANAGEMENT} 
                            element={
                                <RoleProtectedRouter 
                                    element={<ManagementPage />} 
                                    roles={[ROLES.DIRECTOR]} 
                                />
                            } 
                        />
                        
                        {/* 404 route */}
                        <Route path="*" element={<div><h2>404 - Page Not Found</h2></div>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;