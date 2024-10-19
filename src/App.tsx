import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider
import store from './store'; // Import your Redux store
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { AuthProvider, useAuth } from './AuthContext';

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Optionally show a loading state

  return user ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {' '}
      {/* Wrap your application in Provider */}
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/booking"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="/booking/:type"
              element={<ProtectedRoute element={<BookingForm />} />}
            />
            {/* Add more protected routes as needed */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
