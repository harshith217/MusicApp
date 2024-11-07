// src/components/Login.js
import React, { useState } from 'react';
import api from '../services/api'; // Axios instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/users/login', { email, password }); // Use the relative path
      console.log(response);
      localStorage.setItem('token', response.data.token); // Save token
      setAuth(true); // Set auth state
      navigate('/Dashboard'); // Redirect to Dashboard
    } catch (err) {
      console.error(err.response || err.message); // Log error response for debugging
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
