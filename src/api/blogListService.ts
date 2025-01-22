import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchBlogList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/web/blogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};
