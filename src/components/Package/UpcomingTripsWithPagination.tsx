import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UpcomingTrip } from '../../types/upcomingTripTypes';

// Enhanced version with filling fast indicators and login enforcement
const UpcomingTripsWithPagination: React.FC<{ trips: UpcomingTrip[] }> = ({
  trips,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 5;
  const navigate = useNavigate();

  // Sort trips by start date (earliest first)
  const sortedTrips = [...trips].sort((a, b) => {
    return (
      parseDate(a.start_date).getTime() - parseDate(b.start_date).getTime()
    );
  });

  // Calculate pagination values
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = sortedTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(sortedTrips.length / tripsPerPage);

  // Handle page changes
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Helper function to parse date strings
  function parseDate(dateStr: string) {
    const [day, month, year] = dateStr
      .split('/')
      .map((num) => parseInt(num, 10));
    return new Date(2000 + year, month - 1, day); // Convert YY to 20YY format
  }

  // Format the dates to display range
  const formatTripDateRange = (trip: UpcomingTrip) => {
    return `${trip.start_date} - ${trip.end_date}`;
  };

  // Helper to calculate days until trip
  const calculateDaysUntil = (startDate: string) => {
    const tripDate = parseDate(startDate);
    const today = new Date();

    // Reset the time part to compare only dates
    today.setHours(0, 0, 0, 0);
    tripDate.setHours(0, 0, 0, 0);

    const diffTime = tripDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Function to determine seat availability indicator
  const getTripAvailabilityInfo = (trip: UpcomingTrip, index: number) => {
    // Always show the first 2 trips as "Filling Fast" or "Almost Full" regardless of date
    if (currentPage === 1) {
      if (index === 0) {
        return {
          level: 'critical',
          message: 'Almost Full!',
          seats: 'Only 2 seats left',
          className: 'availability-critical',
        };
      } else if (index === 1) {
        return {
          level: 'limited',
          message: 'Filling Fast',
          seats: '5 seats remaining',
          className: 'availability-limited',
        };
      }
    }

    // For other trips, use the date-based logic
    const daysUntil = calculateDaysUntil(trip.start_date);

    if (daysUntil <= 7) {
      return {
        level: 'critical',
        message: 'Almost Full!',
        seats: 'Only 2 seats left',
        className: 'availability-critical',
      };
    } else if (daysUntil <= 15) {
      return {
        level: 'limited',
        message: 'Filling Fast',
        seats: '5 seats remaining',
        className: 'availability-limited',
      };
    } else if (daysUntil <= 30) {
      return {
        level: 'moderate',
        message: 'Booking Up',
        seats: 'Less than 10 seats',
        className: 'availability-moderate',
      };
    } else {
      return {
        level: 'available',
        message: 'Available',
        seats: 'Seats available',
        className: 'availability-available',
      };
    }
  };

  // Handle booking with login enforcement
  const handleBookNow = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tripId: number,
  ) => {
    e.preventDefault();

    // Check if user is logged in by looking for auth token
    const isLoggedIn = !!localStorage.getItem('authToken');

    if (isLoggedIn) {
      // User is logged in, redirect to booking page
      window.location.href = `/bookings/?trip=${tripId}`;
    } else {
      // User is not logged in, redirect to login page with trip_id parameter
      navigate(`/login?trip_id=${tripId}`);
    }
  };

  return (
    <div className="package-side-card">
      <div className="mountain-trips-header">
        <h3 className="mountain-section-title">
          <span className="mountain-title-inner">Upcoming Trips</span>
        </h3>
        <div className="mountain-divider small-divider">
          <div className="mountain-peak"></div>
        </div>
        <p className="trips-subheader">
          Book your adventure now - trips fill quickly!
        </p>
      </div>

      {currentTrips.length > 0 ? (
        <div className="mountain-trips-list">
          {currentTrips.map((trip, index) => {
            const dateRange = formatTripDateRange(trip);
            const availability = getTripAvailabilityInfo(trip, index);

            return (
              <div key={trip.id} className="mountain-trip-item">
                <div className="trip-date-container">
                  <div className="trip-date">{dateRange}</div>
                  <div
                    className={`trip-availability ${availability.className}`}
                  >
                    <span className="availability-indicator"></span>
                    <span className="availability-message">
                      {availability.message}
                    </span>
                  </div>
                </div>
                <div className="trip-details">
                  <div className="trip-seats">{availability.seats}</div>
                  <a
                    href={`/bookings/?trip=${trip.id}`}
                    className="trip-book-button"
                    onClick={(e) => handleBookNow(e, trip.id)}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-trips-message">
          No upcoming trips scheduled at the moment.
        </p>
      )}

      {sortedTrips.length > tripsPerPage && (
        <div className="trips-pagination">
          <button
            className="pagination-btn"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingTripsWithPagination;
