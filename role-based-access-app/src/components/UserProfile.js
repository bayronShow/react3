import { ROLE_NAMES, ROLE_COLORS } from '../constants/roles';

const UserProfile = ({ user, onLogout }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            marginBottom: '15px'
        }}>
            <div style={{
                fontSize: '24px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ROLE_COLORS[user.role],
                borderRadius: '50%',
                color: 'white'
            }}>
                {user.avatar}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{user.name}</div>
                <div style={{ 
                    fontSize: '12px', 
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <span style={{
                        padding: '2px 6px',
                        backgroundColor: ROLE_COLORS[user.role],
                        color: 'white',
                        borderRadius: '10px',
                        fontSize: '10px'
                    }}>
                        {ROLE_NAMES[user.role]}
                    </span>
                    {user.organization}
                </div>
            </div>
            <button 
                onClick={onLogout}
                style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
            >
                Выйти
            </button>
        </div>
    );
};

export default UserProfile;