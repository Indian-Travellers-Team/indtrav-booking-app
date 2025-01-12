import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchHomeData = async () => {
  const response = await axios.get(`${BASE_URL}/api/v1/web/home`);
  return response.data;
};
