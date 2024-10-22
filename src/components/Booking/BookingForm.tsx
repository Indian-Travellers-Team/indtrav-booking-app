import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { fetchCustomerData } from '../../api/customerService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchTripDetails } from '../../api/tripService';
import TripDetails from './TripDetails';
import UserInfoForm from './UserInfoForm';
import './styles/BookingForm.css';

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="booking-container">
      <Container className="form-container">
        <h2 className="text-center mb-2">Book a Trip with</h2>
        <h2
          className="text-center mb-4"
          style={{ color: 'rgb(188, 224, 190)' }}
        >
          Indian Travellers Team 🚀
        </h2>

        <TripDetails tripDetails={tripDetails} />
        <UserInfoForm
          formData={formData}
          tripDetails={tripDetails}
          handleMobileChange={handleMobileChange}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
};

export default BookingForm;
