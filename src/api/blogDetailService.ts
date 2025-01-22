import axios from 'axios';
import type { BlogDetail } from '../types/blogDetailTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchBlogDetail = async (slug: string): Promise<BlogDetail> => {
  const response = await axios.get(`${BASE_URL}/api/v1/web/blogs/${slug}`);
  return response.data;
};
