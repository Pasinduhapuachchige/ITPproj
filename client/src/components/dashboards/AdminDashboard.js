import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState(0); // State to store employee count

  // Fetch employee count on component mount
  useEffect(() => {
    fetchEmployeeCount();
  }, []);

  // Function to fetch employee count from the backend
  const fetchEmployeeCount = async () => {
    try {
      const response = await fetch('/api/employees/count'); // Replace with your API endpoint
      const data = await response.json();
      setEmployeeCount(data.count); // Assuming the API returns { count: 10 }
    } catch (error) {
      console.error('Error fetching employee count:', error);
    }
  };

  // Function to navigate to the Add Employee page
  const navigateToAddEmployee = () => {
    navigate('/add-employee');
  };

  // Function to navigate to the Registered Employees page
  const navigateToRegisteredEmployees = () => {
    navigate('/registered-employees');
  };

  // Function to handle log out
  const handleLogOut = () => {
    // Perform log out actions (e.g., clear session, remove tokens, etc.)
    console.log('User logged out');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="container-fluid">
      {/* Dashboard Header */}
      <header className="bg-primary text-white text-center py-4 mb-4">
        <h1>System Administrator Dashboard</h1>
        <p className="lead">Welcome to the System Administrator Dashboard!</p>
        {/* Log Out Button */}
        <button
          onClick={handleLogOut}
          className="btn btn-danger"
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        >
          Log Out
        </button>
      </header>

      {/* Main Content */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Card for Employee Count */}
          <div className="card text-center mb-4">
            <div className="card-body">
              <h5 className="card-title">Registered Employees</h5>
              <p className="card-text">
                Total Employees: <strong>{employeeCount}</strong>
              </p>
            </div>
          </div>

          {/* Card for Add Employee */}
          <div className="card text-center mb-4">
            <div className="card-body">
              <h5 className="card-title">Add Employee</h5>
              <p className="card-text">Add a new employee to the system.</p>
              <button
                onClick={navigateToAddEmployee}
                className="btn btn-primary"
              >
                Add Employee
              </button>
            </div>
          </div>

          {/* Card for View Registered Employees */}
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">View Registered Employees</h5>
              <p className="card-text">View and manage registered employees.</p>
              <button
                onClick={navigateToRegisteredEmployees}
                className="btn btn-success"
              >
                View Employees
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;