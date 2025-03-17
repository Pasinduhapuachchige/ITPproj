import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = ({ onEmployeeAdded }) => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/employees',
        { employeeNumber, name, email, phoneNumber, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Employee added:', response.data);
      setError('');
      alert('Employee added successfully');

      // Clear the form
      setEmployeeNumber('');
      setName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setRole('employee');

      // Refresh the employee list in the Dashboard
      if (onEmployeeAdded) {
        onEmployeeAdded();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add employee');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Employee Number"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="hr_manager">HR Manager</option>
          <option value="system_admin">System Admin</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;