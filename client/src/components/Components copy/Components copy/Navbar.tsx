import React from "react";
import "./CSS/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        🛍️ <span>MerchStore</span>
      </div>
      <nav className="navbar-links">
        <a href="#">Home</a>
        <a href="#products">All Products</a>

        <div className="dropdown">
          <span>Categories ▾</span>
          <div className="dropdown-content">
            <a href="#apparel">Apparel</a>
            <a href="#accessories">Accessories</a>
            {Array.from({ length: 9 }).map((_, index) => (
              <a key={index} href="#electronics">
                Electronics
              </a>
            ))}
          </div>
        </div>

        <a href="#cart">Cart</a>
        <button className="login-btn">Login</button>
      </nav>
    </header>
  );
};

export default Navbar;
