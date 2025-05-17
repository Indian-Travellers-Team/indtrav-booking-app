import axios from 'axios';

// Set your API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const initializeBooking = async (data: {
  mobile: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  age: string;
}) => {
  const response = await axios.post(
    `${API_URL}/bookings/api/init-booking/`,
    data,
  );
  return response.data; // Return the response data
};

export const createBooking = async (
  data: {
    first_name: string;
    last_name: string;
    gender: string | null;
    age: number | null;
    sharing_type: string | null;
    trip_id: number | null;
    mobile: string;
  },
  token: string,
) => {
  const response = await axios.post(`${API_URL}/api/create-booking/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data; // Return the response data
};

export const createMultiBooking = async (
  data: {
    trip_id: number | null;
    sharing_type: string | null;
    primary_person: {
      first_name: string;
      last_name: string;
      gender: string;
      age: string | null;
      mobile: string;
    };
    additional_persons: Array<{
      first_name: string;
      last_name: string;
      gender: string;
      age: string | null;
    }>;
  },
  token: string,
) => {
  const response = await axios.post(
    `${API_URL}/api/create-multi-booking/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data; // Return the response data
};

export const fetchBookingDetails = async (bookingId: string, token: string) => {
  const response = await axios.get(
    `${API_URL}/api/v1/booking/${bookingId}/success/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  // Transform the API response to match the BookingDetails interface
  const data = response.data;
  return {
    id: data.booking_id,
    trip_name: data.trip_name,
    start_date: formatDate(data.start_date),
    end_date: formatDate(data.end_date),
    persons: data.person_names,
    total_cost_per_person: data.total_cost_pp,
    total_cost: data.total_cost,
    discount: data.total_discount_pp,
    final_cost: data.total_cost - data.total_discount,
    advance_fee: data.advance_payment,
    contact_number: '7531887472', // This seems to be hardcoded in your mock data
  };
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
