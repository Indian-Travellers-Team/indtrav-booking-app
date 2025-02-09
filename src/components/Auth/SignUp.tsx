import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithCredential,
  PhoneAuthProvider,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserEmail, setFirebaseToken } from '../../store/reducers';
import { Button, Form, Container } from 'react-bootstrap';
import './styles/SignUp.css';

const SignUp: React.FC<{ toggleAuthMode: () => void }> = ({
  toggleAuthMode,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const dispatch = useDispatch();

  // Initialize Recaptcha before sending OTP
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
        },
      );
    }
  };

  const sendOtp = async () => {
    setError('');
    if (phone.length < 10) {
      setError('Enter a valid phone number');
      return;
    }

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier,
      );
      setVerificationId(confirmationResult.verificationId);
      setIsOtpSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    if (!verificationId || otp.length !== 6) {
      setError('Invalid OTP');
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential); // ✅ Corrected function

      setIsPhoneVerified(true);
      setSuccessMessage('Phone number verified successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== reenterPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!isPhoneVerified) {
      setError('Please verify your phone number before signing up.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      if (user) {
        await sendEmailVerification(user);
        setSuccessMessage(
          'Signup successful! Verify your email before logging in.',
        );
        dispatch(setUserEmail(user.email));
        dispatch(setFirebaseToken(await user.getIdToken()));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Container className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <Form onSubmit={handleSignUp}>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Form.Control
          type="password"
          placeholder="Re-enter Password"
          value={reenterPassword}
          onChange={(e) => setReenterPassword(e.target.value)}
          required
        />

        <Form.Control
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={isPhoneVerified}
        />

        {!isOtpSent && (
          <Button onClick={sendOtp} disabled={isPhoneVerified}>
            Send OTP
          </Button>
        )}
        {isOtpSent && !isPhoneVerified && (
          <>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Button onClick={verifyOtp}>Verify OTP</Button>
          </>
        )}

        <Button type="submit" disabled={!isPhoneVerified}>
          Sign Up
        </Button>
      </Form>
      <p>
        Already have an account?{' '}
        <Button variant="link" onClick={toggleAuthMode}>
          Login
        </Button>
      </p>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <div id="recaptcha-container"></div>
    </Container>
  );
};

export default SignUp;
