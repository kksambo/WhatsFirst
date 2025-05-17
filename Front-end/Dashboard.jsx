// src/pages/Dashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CallInfo from '../components/CallInfo';
import CallStats from '../components/CallStats';
import { logout, getCurrentUser } from '../services/authService';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      <CallStats />
      <CallInfo />
      {user && user.role === 'OPERATOR' ? (
        <div className="alert alert-info mt-3">
          As an Operator, you have access to real-time call information and statistics.
        </div>
      ) : (
        <Link to="/call-logs" className="btn btn-outline-primary mt-3">
          View Call History
        </Link>
      )}
    </div>
  );
};

export default Dashboard;