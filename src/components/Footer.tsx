import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Ensure this imports the correct CSS file

const Footer: React.FC = () => {
  return (
    <footer className="footer-bg">
      <div className="container">
        <div className="footer-top">
          <div className="footer-column">
            <Link to="/terms">
              <div className="footer-item">Terms & Conditions</div>
            </Link>
            <Link to="/refund-policy">
              <div className="footer-item">Refund Policy</div>
            </Link>
            <Link to="/technology">
              <div className="footer-item">Technology & Developer</div>
            </Link>
          </div>
          <div className="footer-column">
            <Link to="/blogs/">
              <div className="footer-item">Travel Articles</div>
            </Link>
            <Link to="/about-us">
              <div className="footer-item">About Us</div>
            </Link>
            <div className="footer-item">
              Email: booking.indiantravellersteam@gmail.com
            </div>
            <div className="footer-item">Phone: +91 7531887472</div>
          </div>
          <div className="footer-item address">
            <div className="footer-title">Address</div>
            C-1/7, Rohini Sector-16, Rohini, Delhi - 110085 <br />
            (Near District Park)
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-logo">
            <Link to="/">
              <img
                src="https://indiantraveller-cms-staticfiles.s3.amazonaws.com/tourism/img/indian-travellers-team-logo.27f95d45db0e.png"
                alt="Indian Travellers Team Logo"
              />
            </Link>
          </div>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/indian.travellers.trips/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i> Follow Us on Instagram
            </a>
            <div className="made-with-love">
              Made with <span className="heart">♥</span> by Indian Travellers
              Team
            </div>
          </div>
          <div className="footer-caption">
            <div className="copyright-text">
              © 2024 Indian Travellers Team All rights reserved.
            </div>
            <div className="caption">
              Content on this site is copyright protected with respective
              copyrights. Unauthorized use is prohibited.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
