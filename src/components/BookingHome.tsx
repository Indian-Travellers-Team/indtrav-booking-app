import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setTripId } from '../store/reducers';
import { RootState } from '../store';
import '../styles/BookingHome.css';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const tripId = useSelector((state: RootState) => state.trip.tripId);
  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tripIdFromUrl = queryParams.get('trip_id');
    console.log('Trip ID from Redux:', tripId);
    // If trip_id from URL is different from the one in Redux, update it
    if (tripIdFromUrl && tripIdFromUrl !== tripId) {
      dispatch(setTripId(tripIdFromUrl)); // Update trip_id in Redux store
      console.log('Trip ID updated in Redux:', tripIdFromUrl); // Debugging line
    }
  }, [location, dispatch, tripId]);

  const handleLoginRedirect = () => {
    // Redirect to login with the current trip_id
    navigate(`/login?trip_id=${tripId || ''}`);
  };

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
