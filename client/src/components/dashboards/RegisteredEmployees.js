import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GeneratePDF from './GeneratePDF'; // Correct import
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisteredEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      setFilteredEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  // Handle Search
  useEffect(() => {
    const results = employees.filter((employee) => {
      const name = employee.name || '';
      const email = employee.email || '';
      const employeeNumber = employee.employeeNumber || '';

      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employeeNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  // Handle Update
  const handleUpdate = (id) => {
    navigate(`/update-employee/${id}`);
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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Registered Employees</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search Bar and Download PDF Button */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or employee number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <GeneratePDF employees={filteredEmployees} /> {/* Pass filtered employees to PDF component */}
        </div>
      </div>

      {/* Employee Table */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
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
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.employeeNumber || 'N/A'}</td>
              <td>{employee.name || 'N/A'}</td>
              <td>{employee.email || 'N/A'}</td>
              <td>{employee.phoneNumber || 'N/A'}</td>
              <td>{employee.role || 'N/A'}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleUpdate(employee._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredEmployees;