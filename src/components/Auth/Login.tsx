import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserEmail, setFirebaseToken } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../assets/google-logo.png';
import { RootState, AppDispatch } from '../../store';
import '../../styles/Login.css';

const Login: React.FC<{ toggleAuthMode: () => void }> = ({
  toggleAuthMode,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const tripId = useSelector((state: RootState) => state.trip.tripId);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      dispatch(setUserEmail(email)); // Save email in Redux
      dispatch(setFirebaseToken(await user.getIdToken())); // Save Firebase token in Redux

      // Redirect to the booking page with trip_id
      const redirectPath = `/booking?trip_id=${tripId || ''}`;
      navigate(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(setUserEmail(user.email || ''));
      dispatch(setFirebaseToken(await user.getIdToken()));

      const redirectPath = `/booking?trip_id=${tripId || ''}`;
      navigate(redirectPath);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred during Google login',
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="google-login">
        <button onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="Google logo" className="google-logo" />
          Sign in with Google
        </button>
      </div>
      <p>
        Don't have an account? <button onClick={toggleAuthMode}>Sign Up</button>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
