import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
export const fetchUpcomingTrips = async (packageId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/web/upcoming-trips/${packageId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming trips:', error);
    throw error;
  }
};
