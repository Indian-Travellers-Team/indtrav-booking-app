import axios from 'axios';
import type { PackageType } from '../types/packageTypeTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchFeaturedPackages = async (): Promise<PackageType[]> => {
  try {
    const response = await axios.get<PackageType[]>(
      `${BASE_URL}/api/v1/web/packages/type/featured/`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    throw error;
  }
};
