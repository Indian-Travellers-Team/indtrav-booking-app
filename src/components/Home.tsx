import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'; // Import Row and Col from react-bootstrap
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
      <Container className="content-container">
        <Row className="justify-content-center text-center">
          <Col xs={12}>
            <h1 className="title">
              <i className="fas fa-calendar-day"></i> Booking Options
            </h1>
            <p className="subtitle">
              Choose the type of booking that suits your needs.
            </p>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <Link to="/booking/single">
              <div className="button single-booking text-center">
                {' '}
                {/* Added text-center */}
                <span role="img" aria-label="Single Person Booking">
                  👤
                </span>{' '}
                Single Person Booking
              </div>
            </Link>
            <p className="description">
              Select this option if you're booking for yourself.
            </p>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <Link to="/booking/multiple">
              <div className="button multiple-booking text-center">
                {' '}
                {/* Added text-center */}
                <span role="img" aria-label="Multiple Person Booking">
                  👥
                </span>{' '}
                Multiple Person Booking
              </div>
            </Link>
            <p className="description">
              Choose this for booking on behalf of a group or multiple people.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
