// Login.tsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setTripId } from '../store/reducers';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import googleLogo from '../assets/google-logo.png';
import { RootState, AppDispatch } from '../store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const tripIdFromUrl = new URLSearchParams(useLocation().search).get(
    'trip_id',
  ); // Get trip_id from URL

  useEffect(() => {
    if (tripIdFromUrl) {
      dispatch(setTripId(tripIdFromUrl)); // Set trip_id from URL to Redux
      console.log('Trip ID from URL:', tripIdFromUrl); // Debugging line
    }
  }, [dispatch, tripIdFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        if (password !== reenterPassword) {
          setError('Passwords do not match!');
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        if (user) {
          await sendEmailVerification(user);
          console.log('User signed up:', user.email); // Debugging line
        }

        alert(
          'Sign-up successful! Please verify your email before logging in.',
        );
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        console.log('User logged in:', email); // Debugging line

        // Redirect to the booking page with trip_id
        const redirectPath = `/booking?trip_id=${tripIdFromUrl || ''}`;
        navigate(redirectPath);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Login error:', err); // Debugging line
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Google login successful!');
      console.log('Google login successful!'); // Debugging line

      // Redirect to the booking page with trip_id
      const redirectPath = `/booking?trip_id=${tripIdFromUrl || ''}`;
      navigate(redirectPath);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred during Google login',
      );
      console.error('Google login error:', err); // Debugging line
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
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
        {isSignUp && (
          <input
            type="password"
            placeholder="Re-enter Password"
            value={reenterPassword}
            onChange={(e) => setReenterPassword(e.target.value)}
            required
          />
        )}
        {isSignUp && (
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        )}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>

      {!isSignUp && (
        <div className="google-login">
          <button onClick={handleGoogleLogin}>
            <img src={googleLogo} alt="Google logo" className="google-logo" />
            Sign in with Google
          </button>
        </div>
      )}

      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
