this is my header.js i am trying to display that image of that particular user whose email is in localStorage

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import image from '../images/school.jpg';
import axios from 'axios';


const Header = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const response = await axios.get(`http://localhost:5000/api/users/${email}`);
        if (response.data) {
          setUser(response.data);
        } 
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserDetails();
  }, []);



  // Retrieve user email from local storage
  useEffect(() => {
    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  }, []);

  // Handle clicks outside the dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (notificationsRef.current && !notificationsRef.current.contains(event.target)) &&
        (profileRef.current && !profileRef.current.contains(event.target))
      ) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotificationsClick = (e) => {
    e.preventDefault();
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };
  
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail'); // Clear user email on sign out
    navigate('/login');
  };

  return (
    <header className="d-flex align-items-center justify-content-between p-3 header-custom">
      <button className="btn btn-primary d-md-none menu-icon" onClick={toggleSidebar}>
        ☰
      </button>
      {/* <img src={image} alt="School" className="school-logo" /> */}
      <img src={user.Picture ? `http://localhost:5000/${user.Picture}` : image} alt="School" className="school-logo" />
      <h1 className="h5 mb-0 text-center sch">SCHOOL MANAGEMENT SYSTEM</h1>
      <div className="d-flex align-items-center position-relative">
        <a
          href="#notifications"
          className="icon-link"
          onClick={handleNotificationsClick}
          ref={notificationsRef}
        >
          <FontAwesomeIcon icon={faBell} className="icon-circle" />
          {showNotifications && (
            <div className="dropdown-menu notification-dropdown">
              <div className="dropdown-item"><i className="bi bi-bell-slash" ></i> No Notifications available</div>
            </div>
          )}
        </a>
        <a
          href="#profile"
          className="icon-link ml-3"
          onClick={handleProfileClick}
          ref={profileRef}
        >
          <FontAwesomeIcon icon={faUser} className="icon-circle" />
          {showProfileMenu && (
            <div className="dropdown-menu profile-dropdown" >
              <p>{userEmail ? userEmail : 'Email to be displayed here'}</p>
              <Link to="profile" className="dropdown-item" style={{ color: 'white' }}><i className="bi bi-person-circle"></i> View Profile</Link>
              <button onClick={handleSignOut} className="dropdown-item" style={{ color: 'white' }}><i className="bi bi-box-arrow-right"></i> Sign Out</button>
            </div>
          )}
        </a>
      </div>
    </header>
  );
};

export default Header;
