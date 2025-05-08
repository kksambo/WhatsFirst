// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (username, password) => {
    const isAuthenticated = await login(username, password);
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Operator Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <AuthForm onLogin={handleLogin} />
      <p className="text-center mt-3">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
      <p className="text-center">
        <Link to="/forgot-password">Forgot Password?</Link> {/* Link to the new Forgot Password page */}
      </p>
    </div>
  );
};

export default Login;

