import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // In a real app, you'd verify the token with a backend
      // For this static site, we'll just check if it exists
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple authentication - in a real app, this would be done server-side
    // For demonstration purposes, we're using a simple check
    if (username === 'admin' && password === 'portfolio2025') {
      // Store a simple token (in a real app, this would be a JWT from a backend)
      const token = 'admin-token-' + Date.now();
      localStorage.setItem('adminToken', token);
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        
        <div className="admin-content">
          <div className="admin-section">
            <h2>Content Management</h2>
            <p>Manage your portfolio content:</p>
            <button className="admin-btn">Edit Projects</button>
            <button className="admin-btn">Edit Skills</button>
            <button className="admin-btn">Edit Blog Posts</button>
          </div>
          
          <div className="admin-section">
            <h2>Site Settings</h2>
            <p>Configure site appearance and behavior:</p>
            <button className="admin-btn">Theme Settings</button>
            <button className="admin-btn">SEO Configuration</button>
          </div>
          
          <div className="admin-section">
            <h2>Analytics</h2>
            <p>View site statistics and visitor data:</p>
            <button className="admin-btn">View Analytics</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login">
      <div className="login-container">
        <h1>Admin Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;