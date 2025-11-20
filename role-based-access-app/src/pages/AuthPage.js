import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../constants/roles';

const AuthPage = () => {
    const { setRole } = useAuth();

    const handleLogin = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Authentication Page</h2>
            <p>Select your role to login:</p>
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', maxWidth: '200px' }}>
                {Object.values(ROLES).map(role => (
                    <button 
                        key={role} 
                        onClick={() => handleLogin(role)}
                        style={{ padding: '10px', margin: '5px' }}
                    >
                        Login as {role}
                    </button>
                ))}
                <button 
                    onClick={() => handleLogin(null)}
                    style={{ padding: '10px', margin: '5px', backgroundColor: '#ff4444' }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AuthPage;