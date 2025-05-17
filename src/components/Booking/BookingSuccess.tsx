import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchBookingDetails } from '../../api/bookingService';
import './styles/BookingSuccess.css';
import paytmIcon from '../../assets/paytm-icon.png';
import googlePayIcon from '../../assets/google-pay-icon.png';
import phonepeIcon from '../../assets/phonepe-logo-icon.png';

interface BookingDetails {
  id: number;
  trip_name: string;
  start_date: string;
  end_date: string;
  persons: string[];
  total_cost_per_person: number;
  total_cost: number;
  discount: number;
  final_cost: number;
  advance_fee: number;
  contact_number: string;
}

const BookingSuccess: React.FC = () => {
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Get booking ID from URL query params or location state
  const queryParams = new URLSearchParams(location.search);
  const bookingId =
    queryParams.get('booking_id') || (location.state as any)?.bookingId || '';

  useEffect(() => {
    // If no booking ID is present, redirect to home
    if (!bookingId) {
      navigate('/');
      return;
    }

    const getBookingDetails = async () => {
      try {
        setLoading(true);
        // Fetch booking details from API
        const details = await fetchBookingDetails(bookingId);
        setBooking(details);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        // If there's an error, we could either show an error message or redirect
      } finally {
        setLoading(false);
      }
    };

    getBookingDetails();
  }, [bookingId, navigate]);

  // For demo purposes, if we don't have a real API yet
  useEffect(() => {
    // This is a fallback for development/demo when the API is not available
    if (process.env.NODE_ENV === 'development' && !booking && bookingId) {
      // Mock data based on the API response format
      const mockBooking: BookingDetails = {
        id: parseInt(bookingId) || 57,
        trip_name: 'Kedarnath',
        start_date: 'May 23, 2025',
        end_date: 'May 27, 2025',
        persons: ['Deepak Mehta', 'Jyoti Mehta'],
        total_cost_per_person: 6499.0,
        total_cost: 12998.0,
        discount: 0.0,
        final_cost: 12998.0,
        advance_fee: 4000.0,
        contact_number: '7531887472',
      };
      setBooking(mockBooking);
      setLoading(false);
    }
  }, [booking, bookingId]);

  if (loading) {
    return (
      <div className="mountain-theme-wrapper">
        <div className="mountain-loading">
          <div className="mountain-shape"></div>
          <div className="loading-text">Loading your booking details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mountain-theme-wrapper">
      {/* Mountain silhouette header overlay */}
      <div className="mountain-header-overlay">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          className="mountain-svg"
        >
          <path d="M0,0 L0,120 L1200,120 L1200,0 L1110,60 L1020,0 L930,60 L840,0 L750,60 L660,0 L570,60 L480,0 L390,60 L300,0 L210,60 L120,0 L30,60 L0,0 Z"></path>
        </svg>
      </div>

      <Container className="booking-success-container">
        <div className="booking-success-card">
          <h1 className="success-title">Congratulations!</h1>
          <p className="success-subtitle">
            Your Booking is Successfully Registered!
          </p>

          <hr className="success-divider" />

          <div className="booking-details">
            <p className="booking-id">
              <span className="detail-label">Booking ID:</span>
              <span className="detail-value highlighted">{booking?.id}</span>
            </p>

            <p className="trip-name">
              <span className="detail-label">Trip Name:</span>
              <span className="detail-value">{booking?.trip_name}</span>
            </p>

            <p className="start-date">
              <span className="detail-label">Start Date:</span>
              <span className="detail-value">{booking?.start_date}</span>
            </p>

            <p className="end-date">
              <span className="detail-label">End Date:</span>
              <span className="detail-value">{booking?.end_date}</span>
            </p>

            <p className="persons-label">
              <span className="detail-label">Persons in Booking:</span>
            </p>
            <ul className="persons-list">
              {booking?.persons.map((person, index) => (
                <li key={index}>{person}</li>
              ))}
            </ul>

            <p className="cost-per-person">
              <span className="detail-label">Total Cost per Person:</span>
              <span className="detail-value">
                Rs {booking?.total_cost_per_person.toFixed(1)}
              </span>
            </p>

            <p className="total-cost">
              <span className="detail-label">Total Cost:</span>
              <span className="detail-value">
                Rs {booking?.total_cost.toFixed(1)}
              </span>
            </p>

            <p className="discount">
              <span className="detail-label">Total Discount:</span>
              <span className="detail-value">
                Rs {booking?.discount.toFixed(1)} per person
              </span>
            </p>

            <p className="final-cost">
              <span className="detail-label">Final Cost:</span>
              <span className="detail-value">
                <span className="original-price">
                  Rs {booking?.total_cost.toFixed(1)}
                </span>{' '}
                Rs {booking?.final_cost.toFixed(1)} for{' '}
                {booking?.persons.length} person(s)
              </span>
            </p>
          </div>

          <div className="payment-instructions">
            <span className="payment-note">
              To complete your booking, please pay an advance fee of
              <span className="advance-amount">
                {' '}
                Rs {booking?.advance_fee.toFixed(1)}
              </span>{' '}
              on
              <span className="contact-number">
                {' '}
                {booking?.contact_number}
              </span>{' '}
              using any of these payment methods:
            </span>

            <div className="payment-methods">
              <img
                src={paytmIcon}
                alt="Paytm"
                className="payment-logo"
                style={{ maxHeight: '100px', margin: '0 10px' }}
              />
              <img
                src={googlePayIcon}
                alt="Google Pay"
                className="payment-logo"
                style={{ maxHeight: '100px', margin: '0 10px' }}
              />
              <img
                src={phonepeIcon}
                alt="PhonePe"
                className="payment-logo"
                style={{ maxHeight: '100px', margin: '0 10px' }}
              />
            </div>

            <p className="screenshot-instruction">
              Send the screenshot of the payment along with the booking ID (
              {booking?.id}) on Whatsapp on
              <span className="contact-number"> {booking?.contact_number}</span>
              .
            </p>

            <p className="remaining-amount-note">
              Remaining amount will be collected just before onboarding for the
              trip.
            </p>
          </div>
        </div>
      </Container>

      {/* Mountain-themed footer overlay */}
      <div className="mountain-footer-overlay">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          className="mountain-svg"
        >
          <path d="M0,0 L0,120 L1200,120 L1200,0 L1110,60 L1020,0 L930,60 L840,0 L750,60 L660,0 L570,60 L480,0 L390,60 L300,0 L210,60 L120,0 L30,60 L0,0 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default BookingSuccess;
