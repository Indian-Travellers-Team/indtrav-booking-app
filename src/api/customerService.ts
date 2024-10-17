import axios from 'axios';
import { CustomerData } from '../types/customerTypes';

// Get the base API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Function to fetch customer data based on mobile number
export const fetchCustomerData = async (
  mobile: string,
): Promise<CustomerData> => {
  try {
    const response = await axios.get(
      `${API_URL}/bookings/api/get-customer-data/?mobile=${mobile}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching customer data:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};
