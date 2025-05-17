import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './styles/TripDetails.css';

interface TripDetailsProps {
  tripDetails: any;
}

const TripDetails: React.FC<TripDetailsProps> = ({ tripDetails }) => {
  if (!tripDetails) return null; // Render nothing if tripDetails is not available

  return (
    <div className="mountain-trip-details">
      <div className="section-header">
        <h3 className="mountain-section-title">
          <span className="mountain-title-inner">Your Trip Details</span>
        </h3>
        <div className="mountain-divider small-divider">
          <div className="mountain-peak"></div>
        </div>
      </div>

      <div className="trip-info-container">
        <Row className="trip-info-row">
          <Col xs={6} className="trip-info-label">
            <span>Package Name</span>
          </Col>
          <Col xs={6} className="trip-info-value">
            <span>{tripDetails.package_name}</span>
          </Col>
        </Row>

        <Row className="trip-info-row">
          <Col xs={6} className="trip-info-label">
            <span>Start Date</span>
          </Col>
          <Col xs={6} className="trip-info-value">
            <span>{tripDetails.start_date}</span>
          </Col>
        </Row>

        <Row className="trip-info-row">
          <Col xs={6} className="trip-info-label">
            <span>End Date</span>
          </Col>
          <Col xs={6} className="trip-info-value">
            <span>{tripDetails.end_date}</span>
          </Col>
        </Row>

        <Row className="trip-info-row">
          <Col xs={6} className="trip-info-label">
            <span>Advance Payment</span>
          </Col>
          <Col xs={6} className="trip-info-value">
            <span
              style={{
                textDecoration: tripDetails.discount ? 'line-through' : 'none',
              }}
            >
              ₹{tripDetails.advance_payment}
            </span>
            {tripDetails.discount > 0 && (
              <span className="discounted-price">
                {' '}
                ₹{tripDetails.advance_payment - tripDetails.discount}
              </span>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TripDetails;
