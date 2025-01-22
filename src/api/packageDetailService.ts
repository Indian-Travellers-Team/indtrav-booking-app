// src/api/packageDetailService.ts
import axios from 'axios';
import { PackageDetail } from '../types/packageDetailTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchPackageDetail = async (
  slug: string,
): Promise<PackageDetail> => {
  const response = await axios.get<PackageDetail>(
    `${BASE_URL}/api/v1/web/packages/${slug}`,
  );
  return response.data;
};
