import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchUserProfile } from '../../api/userService';
import type { UserProfile } from '../../types/userTypes';
import MyProfile from './MyProfile';
import { Spinner, Container, Alert } from 'react-bootstrap';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('Not authenticated');
        const token = await user.getIdToken();
        const data = await fetchUserProfile(token);
        setProfile(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading profile...</p>
      </Container>
    );
  }

  if (error || !profile) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || 'Failed to load profile.'}</Alert>
      </Container>
    );
  }

  const initialData = {
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email,
    age: profile.age,
    mobileNumber: profile.mobile,
    gender: profile.gender,
  };

  return (
    <Container className="py-4">
      <MyProfile initialData={initialData} />
    </Container>
  );
};

export default ProfilePage;
