import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/Header.css";

const Header = () => {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo Section */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6H4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M10 10h4" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="logo-text">
              <h1>NirogGyan</h1>
              <span>Healthcare Solutions</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="nav">
            <Link to="/" className={isActiveLink("/")}>
              Home
            </Link>
            <Link to="/about" className={isActiveLink("/about")}>
              About
            </Link>
            <Link to="/services" className={isActiveLink("/services")}>
              Services
            </Link>
            <Link to="/contact" className={isActiveLink("/contact")}>
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
