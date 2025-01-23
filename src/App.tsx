// App.tsx
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
import Login from './components/Login';
import NotFound from './components/NotFound';
import AboutUs from './components/AboutUs';
import RefundPolicy from './components/RefundPolicy';
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
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/:slug" element={<BlogDetailPage />} />
              <Route path="/packages/:slug" element={<PackageDetailPage />} />
              <Route
                path="/packages/type/:typeSlug"
                element={<PackageList />}
              />
              <Route path="/login" element={<LoginWrapper />} />
              <Route
                path="/booking"
                element={<ProtectedRoute element={<BookingHome />} />}
              />
              <Route
                path="/booking/:type"
                element={<ProtectedRoute element={<BookingForm />} />}
              />
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

const LoginWrapper: React.FC = () => {
  const { user } = useAuth(); // Get user from AuthContext

  // If user is logged in, redirect to /booking
  if (user) {
    return <Navigate to="/booking" />;
  }

  return <Login />; // Render the Login component if not logged in
};

export default App;
