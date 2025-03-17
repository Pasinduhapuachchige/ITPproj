import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Function to navigate to the Add Employee page
  const navigateToAddEmployee = () => {
    navigate('/add-employee');
  };

  // Function to navigate to the Registered Employees page
  const navigateToRegisteredEmployees = () => {
    navigate('/registered-employees');
  };

  return (
    <div>
      <h1>System Administrator Dashboard</h1>
      <p>Welcome to the System Administrator Dashboard!</p>

      {/* Button to navigate to the Add Employee page */}
      <button onClick={navigateToAddEmployee} style={{ margin: '10px' }}>
        Add Employee
      </button>

      {/* Button to navigate to the Registered Employees page */}
      <button onClick={navigateToRegisteredEmployees} style={{ margin: '10px' }}>
        View Registered Employees
      </button>
    </div>
  );
};

export default AdminDashboard;