// Login.tsx
import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserEmail, setFirebaseToken } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import googleLogo from '../../assets/google-logo.png';
import './styles/Login.css';

// ✅ Add this prop type
type LoginProps = {
  toggleAuthMode: () => void;
};

const Login: React.FC<LoginProps> = ({ toggleAuthMode }) => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(setUserEmail(user.email || ''));
      dispatch(setFirebaseToken(await user.getIdToken()));

      navigate('/booking');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
    }
  };

  return (
    <Container className="auth-container">
      <div className="login-container">
        <h2>Login</h2>
        <div className="google-login">
          <Button onClick={handleGoogleLogin} className="google-btn">
            <img src={googleLogo} alt="Google logo" className="google-logo" />
            Sign in with Google
          </Button>
        </div>
        <p>
          Don’t have an account?{' '}
          <Button variant="link" onClick={toggleAuthMode}>
            Sign Up
          </Button>
        </p>
        {error && <p className="error">{error}</p>}
      </div>
    </Container>
  );
};

export default Login;
