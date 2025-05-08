// src/components/Header.jsx
import React from 'react';
import { logout } from '../services/authService';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest', role: 'none' };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h4>Welcome, {user.username} ({user.role})</h4>
      <button
        className="btn btn-outline-danger"
        onClick={() => {
          logout();
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
