import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import EmployeeDashboard from './components/dashboards/EmployeeDashboard';
import HRDashboard from './components/dashboards/HRDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import AddEmployee from './components/AddEmployee';
import RegisteredEmployees from './components/dashboards/RegisteredEmployees';
import UpdateEmployee from './components/UpdateEmployee';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Redirect to login if no token is found
  if (!token) {
    return <Navigate to="/" />;
  }

  // Render the protected component
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr-dashboard"
          element={
            <ProtectedRoute>
              <HRDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registered-employees"
          element={
            <ProtectedRoute>
              <RegisteredEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-employee/:id"
          element={
            <ProtectedRoute>
              <UpdateEmployee />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route: Redirect to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;