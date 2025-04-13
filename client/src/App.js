import React from 'react';
import './App.css';
import tshirt from './images/tshirt.png';
import cap from './images/cap.png';
import bag from './images/bag.png';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <a href="#">HOME</a>
        <a href="#">SHOP</a>
        <a href="#">ABOUT</a>
        <a href="#">CONTACT</a>
      </nav>

      <header className="hero">
        <h1>MERCHANDISE</h1>
        <button className="shop-button">Shop Now</button>
      </header>

      <div className="hero-images">
        <img src={tshirt} alt="T-Shirt" />
        <img src={cap} alt="Cap" />
        <img src={bag} alt="Tote Bag" />
      </div>

      <section className="products">
        <h2>Featured Products</h2>
        <div className="product-list">
          <div className="product-card">
            <img src={tshirt} alt="T-Shirt" />
            <h3>Shirt</h3>
            <p>$20.00</p>
          </div>
          <div className="product-card">
            <img src={cap} alt="Cap" />
            <h3>Cap</h3>
            <p>$15.00</p>
          </div>
          <div className="product-card">
            <img src={bag} alt="Tote Bag" />
            <h3>Tote Bag</h3>
            <p>$25.00</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
