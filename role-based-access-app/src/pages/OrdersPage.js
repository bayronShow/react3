import { useAuth } from '../hooks/useAuth';

const OrdersPage = () => {
    const { role } = useAuth();
    
    const getRoleSpecificContent = () => {
        switch(role) {
            case 'DIRECTOR':
                return {
                    title: 'Director Orders View',
                    functions: ['Approve orders', 'View all orders', 'Manage order workflow']
                };
            case 'DISPATCHER':
                return {
                    title: 'Dispatcher Orders View', 
                    functions: ['Create orders', 'Assign orders', 'Track order status']
                };
            case 'COURIER':
                return {
                    title: 'Courier Orders View',
                    functions: ['View assigned orders', 'Update delivery status', 'Complete deliveries']
                };
            default:
                return {
                    title: 'Orders Management',
                    functions: ['View orders']
                };
        }
    };

    const content = getRoleSpecificContent();

    return (
        <div style={{ padding: '20px' }}>
            <h2>Orders Page</h2>
            <p>This page is accessible to Directors, Couriers, and Dispatchers</p>
            <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
                <h3>{content.title}</h3>
                <p><strong>Available functions for {role}:</strong></p>
                <ul>
                    {content.functions.map((func, index) => (
                        <li key={index}>{func}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrdersPage;