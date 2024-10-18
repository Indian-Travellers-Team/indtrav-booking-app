import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { AuthProvider, useAuth } from './AuthContext';

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/bookings"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/booking/:type"
            element={<ProtectedRoute element={<BookingForm />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
