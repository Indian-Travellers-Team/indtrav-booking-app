// src/api/userService.ts

import axios from 'axios';
import type { UserProfile } from '../types/userTypes';

const BASE_URL = process.env.REACT_APP_API_URL;

export async function fetchUserProfile(token: string): Promise<UserProfile> {
  const response = await axios.get<UserProfile>(
    `${BASE_URL}/api/v1/user/profile/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
