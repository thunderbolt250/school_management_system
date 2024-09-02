import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import avatar from '../images/avatar.jpeg';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          setError('No user is logged in.');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/users/${email}`);
        if (response.data) {
          setUser(response.data);
        } else {
          setError('User not found.');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('An error occurred while fetching user details.');
      }
    };

    fetchUserDetails();
  }, []);

  const handlePhotoChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', newPhoto);
    formData.append('email', user.email);

    try {
      const response = await axios.post('http://localhost:5000/api/users/update-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setUser({ ...user, Picture: response.data.photoUrl });
        setShowChangeModal(false);
        setShowPreviewModal(false);
      } else {
        setError('Failed to update photo.');
      }
    } catch (err) {
      console.error('Error updating photo:', err);
      setError('An error occurred while updating photo.');
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/change-password', {
        email: user.email,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });

      if (response.data.success) {
        setShowChangePassword(false);
      } else {
        setError('Failed to change password.');
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setError('An error occurred while changing password.');
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Profile Information</h5>
          <div className="d-flex align-items-center mb-3">
            <img
              src={user.Picture ? `http://localhost:5000/${user.Picture}` : avatar}
              alt="User Avatar"
              style={{ width: '100px', height: '100px', cursor: 'pointer', marginRight: '10px', borderRadius: '10%' }}
              onClick={() => setShowPreviewModal(true)}
            />
            <div className="ml-4">
              <p className="card-text"><strong>Names:</strong> {user.names}</p>
              <p className="card-text"><strong>Username:</strong> {user.username}</p>
              <p className="card-text"><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
          <Button variant="primary" onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</Button>
          {showChangePassword && (
            <div className="mt-3">
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  className="form-control"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                />
              </div>
              <Button variant="success" onClick={handleChangePassword}>Submit</Button>
            </div>
          )}
        </div>
      </div>

      <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={user.Picture ? `http://localhost:5000/${user.Picture}` : avatar}
            alt="User Avatar"
            style={{ width: '100%', height: 'auto', borderRadius: '10%' }}
          />
          <Button variant="primary" className="mt-3" onClick={() => setShowChangeModal(true)}>
            Change Picture
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showChangeModal} onHide={() => setShowChangeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePhotoChange}>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">Choose New Photo</label>
              <input
                type="file"
                id="photo"
                className="form-control"
                onChange={(e) => setNewPhoto(e.target.files[0])}
              />
            </div>
            <Button variant="primary" type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
