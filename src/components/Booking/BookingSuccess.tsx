// BookingSuccess.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
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
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const firebaseToken = useSelector(
    (state: RootState) => state.user.firebaseToken,
  );

  const queryParams = new URLSearchParams(location.search);
  const bookingId =
    queryParams.get('booking_id') || (location.state as any)?.bookingId || '';

  useEffect(() => {
    if (!bookingId) {
      navigate('/');
      return;
    }

    const getBookingDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!firebaseToken) {
          setError('Authentication required. Please log in again.');
          setLoading(false);
          return;
        }

        const details = await fetchBookingDetails(bookingId, firebaseToken);
        setBooking(details);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getBookingDetails();
  }, [bookingId, navigate, firebaseToken]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !booking && bookingId) {
      const mockBooking: BookingDetails = {
        id: parseInt(bookingId) || 57,
        trip_name: 'Kedarnath',
        start_date: 'May 23, 2025',
        end_date: 'May 27, 2025',
        persons: ['Deepak Mehta'],
        total_cost_per_person: 13998.0,
        total_cost: 13998.0,
        discount: 0.0,
        final_cost: 13998.0,
        advance_fee: 2000.0,
        contact_number: '7531887472',
      };
      setBooking(mockBooking);
      setLoading(false);
    }
  }, [booking, bookingId]);

  if (loading) {
    return <div className="loading">Loading your booking details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Container className="booking-success-container">
      <div className="booking-success-card">
        <h1 className="success-title">🎉 Congratulations!</h1>
        <p className="success-subtitle">
          Your Booking is Successfully Registered!
        </p>

        <div className="booking-details-table">
          <div className="row-item">
            <span className="label">Booking ID:</span>
            <span className="value">{booking?.id}</span>
          </div>
          <div className="row-item">
            <span className="label">Trip Name:</span>
            <span className="value">{booking?.trip_name}</span>
          </div>
          <div className="row-item">
            <span className="label">Start Date:</span>
            <span className="value">{booking?.start_date}</span>
          </div>
          <div className="row-item">
            <span className="label">End Date:</span>
            <span className="value">{booking?.end_date}</span>
          </div>
          <div className="row-item">
            <span className="label">Persons in Booking:</span>
            <span className="value">
              <ul className="persons-list">
                {booking?.persons.map((person, index) => (
                  <li key={index}>• {person}</li>
                ))}
              </ul>
            </span>
          </div>
        </div>

        <div className="cost-summary-box">
          <div className="row-item">
            <span className="label">Total Cost per Person:</span>
            <span className="value">
              ₹{booking?.total_cost_per_person.toFixed(2)}
            </span>
          </div>
          <div className="row-item">
            <span className="label">Total Cost:</span>
            <span className="value">₹{booking?.total_cost.toFixed(2)}</span>
          </div>
          <div className="row-item">
            <span className="label">Total Discount:</span>
            <span className="value">₹{booking?.discount.toFixed(2)}</span>
          </div>
          <div className="row-item final-row">
            <span className="label">
              <strong>Final Cost:</strong>
            </span>
            <span className="value">
              <span className="strikethrough">
                ₹{booking?.total_cost.toFixed(2)}
              </span>{' '}
              <strong>₹{booking?.final_cost.toFixed(2)}</strong> for{' '}
              {booking?.persons.length} person(s)
            </span>
          </div>
        </div>

        <div className="payment-instructions green-box">
          <p>
            <strong>To complete your booking</strong>, please pay an advance fee
            of{' '}
            <span className="highlight-green">
              ₹{booking?.advance_fee.toFixed(2)}
            </span>{' '}
            on{' '}
            <span className="highlight-green">{booking?.contact_number}</span>{' '}
            using any of these payment methods:
          </p>
          <div className="payment-methods">
            <img src={paytmIcon} alt="Paytm" className="payment-logo" />
            <img
              src={googlePayIcon}
              alt="Google Pay"
              className="payment-logo"
            />
            <img src={phonepeIcon} alt="PhonePe" className="payment-logo" />
          </div>
        </div>

        <div className="green-box">
          <p>
            ✅ Send the screenshot of the payment along with the booking ID (
            {booking?.id}) on WhatsApp at{' '}
            <strong>{booking?.contact_number}</strong>.
          </p>
        </div>

        <p className="note-footer">
          <em>
            Remaining amount will be collected just before onboarding for the
            trip.
          </em>
        </p>
      </div>
    </Container>
  );
};

export default BookingSuccess;
