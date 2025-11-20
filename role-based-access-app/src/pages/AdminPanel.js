import { useAuth } from '../hooks/useAuth';

const AdminPanel = () => {
    const { role } = useAuth();
    
    return (
        <div style={{ padding: '20px' }}>
            <h2>Admin Panel</h2>
            <p>Welcome to Admin Panel - Accessible only for ADMINs</p>
            <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '5px' }}>
                <h3>Admin Functions:</h3>
                <ul>
                    <li>User Management</li>
                    <li>System Configuration</li>
                    <li>Database Administration</li>
                    <li>Role Assignments</li>
                    <li>Audit Logs</li>
                </ul>
                <p><strong>Current role: {role}</strong></p>
            </div>
        </div>
    );
};

export default AdminPanel;