import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Indian Travellers Team</h1>
      <h2>Booking Options</h2>
      <Link to="/booking/single">
        <button>Single Person Booking</button>
      </Link>
      <Link to="/booking/multiple">
        <button>Multiple Person Booking</button>
      </Link>
    </div>
  );
};

export default Home;
