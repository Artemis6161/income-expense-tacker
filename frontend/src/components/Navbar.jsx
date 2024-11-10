import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'; // Import the CSS

const Navbar = ({ isAuthenticated, setIsAuthenticated, userName, setUserName }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('userId');  
    localStorage.removeItem('userName');
    setIsAuthenticated(false);  
    setUserName('');
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        My Traker 
      </Link>

      {/* Hamburger Icon for Mobile (Inside Navbar) */}
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Dashboard</Link>
        </li>
        <li>
          <Link to="/income" onClick={closeMenu}>Income</Link>
        </li>
        <li>
          <Link to="/expense" onClick={closeMenu}>Expense</Link>
        </li>
        <li>
          <Link to="/Profile" onClick={closeMenu}>Profile</Link>
        </li>
        <li>
          <Link to="/Register" onClick={closeMenu}>Register</Link>
        </li>

        {/* Login/Logout Button */}
        {isAuthenticated ? (
          <>
            <li> Welcome, {userName} </li>
            <li>
              <button className="navbar-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <Link to="/login" className="navbar-button" onClick={closeMenu}>
            Login
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
