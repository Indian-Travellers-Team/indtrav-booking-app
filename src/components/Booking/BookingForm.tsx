import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { fetchCustomerData } from '../../api/customerService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchTripDetails } from '../../api/tripService';
import TripDetails from './TripDetails';
import UserInfoForm from './UserInfoForm';
import './styles/BookingForm.css';
import { useLocation } from 'react-router-dom'; // Import useLocation to get the current route

// Define the state type for form data
interface BookingFormData {
  mobile: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number | ''; // Allow age to be a number or empty string
  email: string;
  sharingType: string; // Added field for sharing type
}

const BookingForm: React.FC = () => {
  const location = useLocation(); // Get the current route
  const isMultipleBooking = location.pathname === '/booking/multiple'; // Check if the route is for multiple booking

  const [formData, setFormData] = useState<BookingFormData>({
    mobile: '',
    firstName: '',
    lastName: '',
    gender: 'male',
    age: '',
    email: '',
    sharingType: '',
  });

  const [tripDetails, setTripDetails] = useState<any>(null);
  const tripId = useSelector((state: RootState) => state.trip.tripId);
  const userEmail = useSelector((state: RootState) => state.user.email);
  const firebaseToken = useSelector(
    (state: RootState) => state.user.firebaseToken,
  );

  useEffect(() => {
    const fetchDetails = async () => {
      if (tripId) {
        try {
          const response = await fetchTripDetails(tripId);
          setTripDetails(response);
        } catch (error) {
          console.error('Failed to fetch trip details:', error);
        }
      }
    };

    fetchDetails();
  }, [tripId]);

  useEffect(() => {
    if (userEmail) {
      setFormData((prevData) => ({
        ...prevData,
        email: userEmail,
      }));
    }
  }, [userEmail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMobileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, mobile: value }));

    if (value.length === 10) {
      try {
        const customerData = await fetchCustomerData(value);
        setFormData((prevData) => ({
          ...prevData,
          firstName: customerData.first_name,
          lastName: customerData.last_name,
          email: customerData.email,
          age: customerData.age,
          gender: customerData.gender,
        }));
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="mountain-theme-wrapper">
      {/* Mountain silhouette header overlay */}
      <div className="mountain-header-overlay">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          className="mountain-svg"
        >
          <path d="M0,0 L0,120 L1200,120 L1200,0 L1110,60 L1020,0 L930,60 L840,0 L750,60 L660,0 L570,60 L480,0 L390,60 L300,0 L210,60 L120,0 L30,60 L0,0 Z"></path>
        </svg>
      </div>

      <div className="booking-container">
        <Container className="mountain-booking-form">
          <div className="booking-header">
            <h2 className="booking-title">Book Your Adventure</h2>
            <div className="mountain-divider">
              <div className="mountain-peak"></div>
            </div>
            <h4 className="booking-subtitle">
              Indian Travellers Team <span className="adventure-icon">🏔️</span>
            </h4>
          </div>

          <TripDetails tripDetails={tripDetails} />

          <UserInfoForm
            formData={formData}
            tripDetails={tripDetails}
            handleMobileChange={handleMobileChange}
            handleInputChange={handleInputChange}
            token={firebaseToken} // Add the Firebase token if needed
            isMultipleBooking={isMultipleBooking}
          />
        </Container>
      </div>

      {/* Mountain-themed footer overlay */}
      <div className="mountain-footer-overlay">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          className="mountain-svg"
        >
          <path d="M0,0 L0,120 L1200,120 L1200,0 L1110,60 L1020,0 L930,60 L840,0 L750,60 L660,0 L570,60 L480,0 L390,60 L300,0 L210,60 L120,0 L30,60 L0,0 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default BookingForm;
