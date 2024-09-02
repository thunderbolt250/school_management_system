import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.success) {
        // Save the JWT token and user email to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', email);
        // Navigate to the home page upon successful login
        navigate('/home');
      } else {
        // Display error message if login fails
        setError('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark">
      <div className="p-4 p-md-5 log-div rounded shadow">
        <h1>School Management System (SMS)</h1>
        <h2 className="mb-4 h3 font-weight-bold text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control" required />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
            <p>Don't have an account? <a href='/sign-up'>Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
