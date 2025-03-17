import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisteredEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all registered employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  // Handle Update
  const handleUpdate = (id) => {
    navigate(`/update-employee/${id}`); // Navigate to the update form
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Employee deleted successfully');
        fetchEmployees(); // Refresh the employee list
      } catch (err) {
        setError('Failed to delete employee');
      }
    }
  };

  return (
    <div>
      <h1>Registered Employees</h1>
      {error && <p>{error}</p>}

      {/* Display the list of employees */}
      <table>
        <thead>
          <tr>
            <th>Employee Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.employeeNumber}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.role}</td>
              <td>
                <button onClick={() => handleUpdate(employee._id)}>Update</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredEmployees;