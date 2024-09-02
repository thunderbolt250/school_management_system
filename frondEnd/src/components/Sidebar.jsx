import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = ({ onLinkClick }) => {
  const [isGamesExpanded, setIsGamesExpanded] = useState(false);

  const toggleGamesMenu = () => {
    setIsGamesExpanded(!isGamesExpanded);
  };

  return (
    <div className="sidebar-custom">
      <h2 className="mb-4">SMS</h2>
      <nav>
        <ul>
          <li>
            <Link to="dashboard" onClick={onLinkClick}>
              <i className="bi bi-speedometer2"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="students" onClick={onLinkClick}>
              <i className="bi bi-people"></i> Students
            </Link>
          </li>
          <li>
            <Link to="insert-students" onClick={onLinkClick}>
              <i className="bi bi-person-plus"></i> Insert Students
            </Link>
          </li>
          <li>
            <Link to="users" onClick={onLinkClick}>
              <i className="bi bi-person"></i> Users
            </Link>
          </li>
          <li>
            <div onClick={toggleGamesMenu} style={{ cursor: 'pointer' }} >
              <i className="bi bi-controller"></i> Games
              <i className={`bi ${isGamesExpanded ? 'bi-caret-down-fill' : 'bi-caret-right-fill'}`} style={{ float: 'right' }}></i>
            </div>
            {isGamesExpanded && (
              <ul className="sub-menu">
                <li>
                  <Link to="guess-number" onClick={onLinkClick}>
                    <i className="bi bi-chevron-right"></i> Number Guessing Game
                  </Link>
                </li>
                <li>
                  <Link to="match-color" onClick={onLinkClick}>
                    <i className="bi bi-chevron-right"></i> Color Matching Game
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="settings" onClick={onLinkClick}>
              <i className="bi bi-gear"></i> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
