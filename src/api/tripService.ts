import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/trips/';
export const fetchTripDetails = async (tripId: string) => {
  const response = await axios.get(`${API_URL}${tripId}/`);
  return response.data;
};
