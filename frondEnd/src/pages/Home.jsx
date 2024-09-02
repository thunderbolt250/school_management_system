import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
//import './Home.css'; // Import additional styles if necessary

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="d-flex min-vh-100">
      <div className={`sidebar-container ${sidebarOpen ? 'show' : ''}`}>
        <Sidebar onLinkClick={handleLinkClick} />
      </div>
      <div className="d-flex flex-column flex-grow-1">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex-grow-1 p-4 bg-dark-custom text-white overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
