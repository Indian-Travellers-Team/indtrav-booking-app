import React from 'react';
import '../styles/Confirmation.css';

const Confirmation: React.FC = () => {
  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">Booking Confirmation</h2>
      <p className="confirmation-message">Thank you for your booking!</p>
      <button className="confirmation-button">Go to Home</button>
    </div>
  );
};

export default Confirmation;
