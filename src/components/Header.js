import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Header.css";

const Header = () => {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };

  return (
    <header className={`header d-flex align-items-center sticky-top ${isMobileNavActive ? "mobile-nav-active" : ""}`}>
      <div className="container position-relative d-flex align-items-center justify-content-between">
  <Link to="/" className="logo d-flex align-items-center me-auto" style={{ textDecoration: 'none' }}>
    <h1 className="sitename">BookNest</h1>
  </Link>

        <nav className={`navmenu ${isMobileNavActive ? "mobile-nav-active" : ""}`}>
          <ul>
            <li><Link to="/home" onClick={toggleMobileNav}>Home</Link></li>
           
            <li><Link to="/books" onClick={toggleMobileNav}>Books</Link></li>
            <li><Link to="/cart" onClick={toggleMobileNav}>ShoppingCart</Link></li>
            <li><Link to="/Payment" onClick={toggleMobileNav}>PaymentPage</Link></li>
            
            <li><Link to="/register" onClick={toggleMobileNav}>Register/Login</Link></li>
            <li><Link to="/profile" onClick={toggleMobileNav}>Profile</Link></li>

      
        
          </ul>
        </nav>

        <div className="mobile-nav-toggle" onClick={toggleMobileNav}>
          <i className={`bi ${isMobileNavActive ? "bi-x" : "bi-list"}`}></i>
        </div>
      </div>
    </header>
  );
};

export default Header;