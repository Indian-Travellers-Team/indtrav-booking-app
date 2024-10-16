import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="title">
        <i className="fa fa-calendar-day"></i> {/* Use 'fas' for solid icons */}
        Booking Options
      </h1>
      <p className="subtitle">Choose the type of booking that suits your needs.</p>
      <div className="button-container">
        <Link to="/booking/single">
          <div className="button single-booking">
            <span>👤 Single Person Booking</span>
            <p className="description">Select this option if you're booking for yourself.</p>
          </div>
        </Link>
        <Link to="/booking/multiple">
          <div className="button multiple-booking">
            <span>👥 Multiple Person Booking</span>
            <p className="description">Choose this for booking on behalf of a group or multiple people.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
