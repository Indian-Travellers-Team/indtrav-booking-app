// Get the base API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const sendCallbackRequest = async (data: {
  package: number;
  name: string;
  mobile: string;
  message: string;
}): Promise<void> => {
  const response = await fetch(`${API_URL}/api/v1/web/callback-request/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to send callback request');
  }
};
