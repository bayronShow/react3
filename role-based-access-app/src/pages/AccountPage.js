import { useAuth } from '../hooks/useAuth';

const AccountPage = () => {
    const { role, getTestUserData } = useAuth();
    const userData = getTestUserData();

    return (
        <div>
            <h2>Account Page</h2>
            <p>Welcome, {userData.name}!</p>
            <p>Your role: {role}</p>
            <p>Email: {userData.email}</p>
            <p>Organization: {userData.organization}</p>
        </div>
    );
};

export default AccountPage;