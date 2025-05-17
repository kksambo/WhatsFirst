// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authService'; // We'll create this function

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(username); // Call the reset password service
    if (result.success) {
      setMessage(result.message || 'Password reset link sent to your email.');
      setError('');
      // Optionally navigate back to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setError(result.error || 'Failed to reset password. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Forgot Your Password?</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="form-text">Enter your username to reset your password.</div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
      </form>
      <p className="text-center mt-3">
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;