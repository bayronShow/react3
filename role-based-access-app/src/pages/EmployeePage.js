const EmployeePage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Employees List</h2>
            <p>This page is accessible only for DIRECTORS</p>
            <div style={{ backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '5px' }}>
                <h3>Employee Management</h3>
                <ul>
                    <li>John Doe - Dispatcher</li>
                    <li>Jane Smith - Courier</li>
                    <li>Mike Johnson - Specialist</li>
                    <li>Sarah Wilson - Courier</li>
                </ul>
            </div>
        </div>
    );
};

export default EmployeePage;