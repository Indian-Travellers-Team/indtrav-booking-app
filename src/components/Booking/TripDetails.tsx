// src/components/TripDetails.tsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './styles/TripDetails.css';

interface TripDetailsProps {
  tripDetails: any;
}

const TripDetails: React.FC<TripDetailsProps> = ({ tripDetails }) => {
  if (!tripDetails) return null; // Render nothing if tripDetails is not available

  return (
    <div className="trip-details mb-4">
      <h4>Your Trip Details</h4>
      <Row>
        <Col xs={6}>
          <strong>Package Name:</strong>
        </Col>
        <Col xs={6}>
          <span>{tripDetails.package_name}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <strong>Start Date:</strong>
        </Col>
        <Col xs={6}>
          <span>{tripDetails.start_date}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <strong>End Date:</strong>
        </Col>
        <Col xs={6}>
          <span>{tripDetails.end_date}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <strong>Advance Payment:</strong>
        </Col>
        <Col xs={6}>
          <span
            style={{
              textDecoration: tripDetails.discount ? 'line-through' : 'none',
            }}
          >
            ₹{tripDetails.advance_payment}
          </span>
          {tripDetails.discount > 0 && (
            <span> ₹{tripDetails.advance_payment - tripDetails.discount}</span>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TripDetails;
