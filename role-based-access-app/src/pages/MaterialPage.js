const MaterialPage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Material List</h2>
            <p>This page is accessible for DIRECTORS and SPECIALISTS</p>
            <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '5px' }}>
                <h3>Available Materials:</h3>
                <ul>
                    <li>Material A - 50 units</li>
                    <li>Material B - 25 units</li>
                    <li>Material C - 100 units</li>
                    <li>Material D - 10 units</li>
                </ul>
            </div>
        </div>
    );
};

export default MaterialPage;