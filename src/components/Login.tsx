import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  User,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import '../styles/Login.css'; // Import styles for the Login component
import googleLogo from '../assets/google-logo.png'; // Add Google logo to your project

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState(''); // State for re-enter password
  const [phone, setPhone] = useState(''); // State for phone number
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        // Check if passwords match
        if (password !== reenterPassword) {
          setError('Passwords do not match!');
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user; // Get the User object

        // Ensure the user is defined before calling sendEmailVerification
        if (user) {
          await sendEmailVerification(user); // Call sendEmailVerification correctly
        }

        alert(
          'Sign-up successful! Please verify your email before logging in.',
        );
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Google login successful!');
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
        {isSignUp && ( // Show re-enter password field only for sign-up
          <input
            type="password"
            placeholder="Re-enter Password"
            value={reenterPassword}
            onChange={(e) => setReenterPassword(e.target.value)}
            required
          />
        )}
        {isSignUp && ( // Show phone number field only for sign-up
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

      {/* Google Login Button */}
      <div className="google-login">
        <button onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="Google logo" className="google-logo" />{' '}
          {/* Add your Google logo here */}
          Sign in with Google
        </button>
      </div>

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
