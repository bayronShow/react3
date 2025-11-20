const ManagementPage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Organization Management</h2>
            <p>This page is accessible only for DIRECTORS</p>
            <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '5px' }}>
                <h3>Organization Settings:</h3>
                <ul>
                    <li>Department Structure</li>
                    <li>Budget Allocation</li>
                    <li>Performance Metrics</li>
                    <li>Strategic Planning</li>
                </ul>
            </div>
        </div>
    );
};

export default ManagementPage;