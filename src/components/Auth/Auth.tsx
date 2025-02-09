import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return isSignUp ? (
    <SignUp toggleAuthMode={toggleAuthMode} />
  ) : (
    <Login toggleAuthMode={toggleAuthMode} />
  );
};

export default Auth;
