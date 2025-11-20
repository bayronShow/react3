import { useAuth } from '../hooks/useAuth';

const DirectorPanel = () => {
    const { role } = useAuth();
    
    return (
        <div style={{ padding: '20px' }}>
            <h2>Director Panel</h2>
            <p>Welcome to Director Panel - Accessible only for DIRECTORS</p>
            <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '5px' }}>
                <h3>Director Functions:</h3>
                <ul>
                    <li>Manage Employees</li>
                    <li>View Financial Reports</li>
                    <li>Organization Management</li>
                    <li>Approve Orders</li>
                </ul>
                <p><strong>Current role: {role}</strong></p>
            </div>
        </div>
    );
};

export default DirectorPanel;