import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">Your<span>Blog</span></Link>
      </div>

      {/* HAMBURGER BUTTON */}
      <button
        className="navbar-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* NAV LINKS */}
      <ul className={`navbar-list ${isMenuOpen ? 'open' : ''}`}>
        <li className="navbar-item">
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
        </li>
      </ul>

      {/* THEME TOGGLE */}
      <button
        className="theme-toggle-button"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
