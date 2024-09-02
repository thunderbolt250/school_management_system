import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function Sign_Up() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 5) newErrors.password = 'Password must be at least 5 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post('http://localhost:5000/api/users', {
        names: name,
        username: username,
        email: email,
        password: password,
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark">
        <div className="p-4 p-md-5 log-div rounded shadow">
          <h1>School Management System (SMS)</h1>
          <h2 className="mb-4 h3 font-weight-bold text-center">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Names</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors.username && <div className="text-danger">{errors.username}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">Register</button>
              <br/>
              <p>Already have an Account ? <a href='/login'>Sign In</a> here</p>
            </div>
          </form>
        </div>
      </div>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Successfully registered!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sign_Up;
