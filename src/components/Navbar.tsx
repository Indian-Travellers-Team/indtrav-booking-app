import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-custom fixed-top"> {/* Added fixed-top class */}
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="https://indiantraveller-cms-staticfiles.s3.amazonaws.com/tourism/img/logo.9325bd60d9bf.png"
            alt="Logo"
            height="30"
          />
          Indian Travellers Team
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs/">Articles</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="packagesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Packages
              </Link>
              <div className="dropdown-menu" aria-labelledby="packagesDropdown">
                {/* Dynamic content will be loaded here */}
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="summerTripsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Summer Trips
              </Link>
              <div className="dropdown-menu" aria-labelledby="summerTripsDropdown">
                {/* Dynamic content will be loaded here */}
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="winterTripsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Winter Trips
              </Link>
              <div className="dropdown-menu" aria-labelledby="winterTripsDropdown">
                {/* Dynamic content will be loaded here */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
