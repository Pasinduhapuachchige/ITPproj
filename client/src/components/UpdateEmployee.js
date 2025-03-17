import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState({
    employeeNumber: '',
    name: '',
    email: '',
    phoneNumber: '',
    role: 'employee',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data); // Set the employee data
      } catch (err) {
        setError('Failed to fetch employee details');
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/employees/${id}`,
        employee,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Employee updated successfully');
      navigate('/registered-employees'); // Redirect to the employee list
    } catch (err) {
      setError('Failed to update employee');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <div>
      <h2>Update Employee</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employeeNumber"
          placeholder="Employee Number"
          value={employee.employeeNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={employee.phoneNumber}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={employee.role}
          onChange={handleChange}
        >
          <option value="employee">Employee</option>
          <option value="hr_manager">HR Manager</option>
          <option value="system_admin">System Admin</option>
        </select>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;