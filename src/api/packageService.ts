import axios from 'axios';
import { PackageResponse } from '../types/packageTypes'; // Import the defined types

const API_URL = process.env.REACT_APP_API_URL + '/packages/api/packages/';
//const API_URL = 'http://localhost:8000/packages/api/packages/';
export const fetchPackages = async (): Promise<PackageResponse> => {
  try {
    const response = await axios.get<PackageResponse>(API_URL);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error; // Rethrow the error to handle it later in the calling function
  }
};
