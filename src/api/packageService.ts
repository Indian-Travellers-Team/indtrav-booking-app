import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/packages/api/packages/';

export const fetchPackages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error; // Rethrow the error to handle it later in the calling function
  }
};
