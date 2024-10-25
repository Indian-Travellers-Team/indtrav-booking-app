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
