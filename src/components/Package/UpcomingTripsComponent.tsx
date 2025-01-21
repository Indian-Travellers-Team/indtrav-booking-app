import React from 'react';
import type { UpcomingTrip } from '../../types/UpcomingTripTypes';
import './styles/UpcomingTripsComponent.css';

const UpcomingTripsComponent: React.FC<{ trips: UpcomingTrip[] }> = ({
  trips,
}) => {
  return (
    <div className="upcoming-trips-section">
      <h3 className="title-with-underline">
        Upcoming Trips - Hurry Up Book Now
      </h3>
      <div className="upcoming-trips-list">
        {trips.map((trip) => (
          <div key={trip.id} className="upcoming-trip">
            <span>
              {new Date(trip.start_date).toLocaleDateString()} -{' '}
              {new Date(trip.end_date).toLocaleDateString()}
            </span>
            <a
              href={`/booking/single?trip_id=${trip.id}`}
              className="book-now-button"
            >
              Book Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTripsComponent;
