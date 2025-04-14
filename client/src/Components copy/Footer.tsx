import React from "react";
import "./CSS/Footer.css";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer>
      {/* Newsletter Section */}
      <div className="newsletter">
        <h2>Join Our Newsletter</h2>
        <p>
          Subscribe to get special offers, free giveaways, and
          once-in-a-lifetime deals.
        </p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Footer Section */}
      <div className="footer-content">
        <div className="footer-column">
          <h3>SnapKart</h3>
          <p>Premium merchandise for every occasion.</p>
        </div>
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li>All Products</li>
            <li>T-Shirts</li>
            <li>Hoodies</li>
            <li>Accessories</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li>FAQ</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Pinterest">
              <FaPinterestP />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>© 2025 SnapKart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
