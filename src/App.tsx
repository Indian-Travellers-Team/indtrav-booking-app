import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import BookingForm from './components/BookingForm';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/bookings" element={<Home />} />
        <Route path="/booking/:type" element={<BookingForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
