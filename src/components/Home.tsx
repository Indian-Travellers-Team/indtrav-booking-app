import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; 

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="content-container"> {/* New container for semi-transparent background */}
        <h1 className="title">
          <i className="fas fa-calendar-day"></i> Booking Options
        </h1>
        <p className="subtitle">Choose the type of booking that suits your needs.</p>
        <div className="button-container">
          <div className="button-wrapper">
            <Link to="/booking/single">
              <div className="button single-booking">
                <span>👤 Single Person Booking</span>
              </div>
            </Link>
            <p className="description">Select this option if you're booking for yourself.</p>
          </div>

          <div className="button-wrapper">
            <Link to="/booking/multiple">
              <div className="button multiple-booking">
                <span>👥 Multiple Person Booking</span>
              </div>
            </Link>
            <p className="description">Choose this for booking on behalf of a group or multiple people.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
