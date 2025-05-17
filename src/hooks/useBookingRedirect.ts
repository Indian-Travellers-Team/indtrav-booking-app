import React from 'react';
import { useNavigate } from 'react-router-dom';

// This is a utility function that can be used to redirect to the success page
// after a successful booking
const useBookingRedirect = () => {
  const navigate = useNavigate();

  const redirectToSuccess = (bookingId: number | string) => {
    // Redirect to the success page with the booking ID
    navigate(`/booking/success?booking_id=${bookingId}`, {
      state: { bookingId },
    });
  };

  return { redirectToSuccess };
};

export default useBookingRedirect;
