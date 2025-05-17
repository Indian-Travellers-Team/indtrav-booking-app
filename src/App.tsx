import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import PackageDetailPage from './components/Package/PackageDetail';
import PackageList from './components/Package/PackageList';
import BlogList from './components/Blog/BlogList';
import BlogDetailPage from './components/Blog/BlogDetail';
import BookingHome from './components/BookingHome';
import BookingForm from './components/Booking/BookingForm';
import BookingSuccess from './components/Booking/BookingSuccess'; // Import the BookingSuccess component
import Auth from './components/Auth/Auth'; // Updated import for combined Auth component
import NotFound from './components/NotFound';
import AboutUs from './components/AboutUs';
import RefundPolicy from './components/RefundPolicy';
import Terms from './components/Terms';
import { AuthProvider, useAuth } from './AuthContext';

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { user, loading } = useAuth();
  const tripId = new URLSearchParams(window.location.search).get('trip_id'); // Get trip_id from URL

  if (loading) return <div>Loading...</div>; // Show loading state

  return user ? element : <Navigate to={`/login?trip_id=${tripId || ''}`} />; // Redirect with trip_id
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/:slug" element={<BlogDetailPage />} />
              <Route path="/packages/:slug" element={<PackageDetailPage />} />
              <Route
                path="/packages/type/:typeSlug"
                element={<PackageList />}
              />
              <Route path="/login" element={<AuthWrapper />} /> {/* Updated */}
              <Route
                path="/booking"
                element={<ProtectedRoute element={<BookingHome />} />}
              />
              <Route
                path="/booking/:type"
                element={<ProtectedRoute element={<BookingForm />} />}
              />
              {/* Add BookingSuccess route */}
              <Route path="/booking/success" element={<BookingSuccess />} />
              {/* More protected routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

// Wrapper to handle redirect logic for authenticated users
const AuthWrapper: React.FC = () => {
  const { user } = useAuth();

  // If the user is logged in, redirect to the booking page
  if (user) {
    return <Navigate to="/booking" />;
  }

  return <Auth />; // Render the combined Auth component for login/signup
};

export default App;
