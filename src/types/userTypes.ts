// src/types/userTypes.ts

export interface UserProfile {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  mobile: string;
  email: string;
  created_at: string;
  is_active: boolean;
}
