import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="overlay">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="back-home-link">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
