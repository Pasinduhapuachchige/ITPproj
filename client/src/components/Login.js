import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use named import

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Save the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Decode the token to get the role
      const decoded = jwtDecode(response.data.token); // Use jwtDecode directly
      const role = decoded.role;

      // Redirect based on role
      if (role === 'employee') {
        navigate('/employee-dashboard');
      } else if (role === 'hr_manager') {
        navigate('/hr-dashboard');
      } else if (role === 'system_admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard'); // Fallback for unknown roles
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;