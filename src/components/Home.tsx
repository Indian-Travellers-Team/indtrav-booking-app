import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tripId = queryParams.get('trip_id');

    if (tripId) {
      console.log('Trip ID:', tripId); // Log the trip_id to the console
    }
  }, [location]);

  return (
    <div className="home-container">
      <div className="content-container">
        <h1 className="title">
          <i className="fas fa-calendar-day"></i> Booking Options
        </h1>
        <p className="subtitle">
          Choose the type of booking that suits your needs.
        </p>
        <div className="button-container">
          <div className="button-wrapper">
            <Link to="/booking/single">
              <div className="button single-booking">
                <span role="img" aria-label="Single Person Booking">
                  👤
                </span>{' '}
                Single Person Booking
              </div>
            </Link>
            <p className="description">
              Select this option if you're booking for yourself.
            </p>
          </div>

          <div className="button-wrapper">
            <Link to="/booking/multiple">
              <div className="button multiple-booking">
                <span role="img" aria-label="Multiple Person Booking">
                  👥
                </span>{' '}
                Multiple Person Booking
              </div>
            </Link>
            <p className="description">
              Choose this for booking on behalf of a group or multiple people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
