// src/components/BookingForm.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { fetchCustomerData } from '../api/customerService';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchTripDetails } from '../api/tripService';
import '../styles/BookingForm.css';

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
    sharingType: '', // Initialize sharing type
  });

  const [tripDetails, setTripDetails] = useState<any>(null); // State to hold trip details
  const tripId = useSelector((state: RootState) => state.trip.tripId); // Get trip_id from Redux store
  const userEmail = useSelector((state: RootState) => state.user.email); // Get user email from Redux store

  useEffect(() => {
    const fetchDetails = async () => {
      if (tripId) {
        try {
          const response = await fetchTripDetails(tripId); // Fetch trip details using trip_id
          setTripDetails(response); // Store the response in state
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
        email: userEmail, // Prefill email if user is logged in
      }));
    }
  }, [userEmail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMobileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, mobile: value }));

    // Fetch customer data when mobile number is entered
    if (value.length === 10) {
      try {
        const customerData = await fetchCustomerData(value);
        setFormData((prevData) => ({
          ...prevData,
          firstName: customerData.first_name,
          lastName: customerData.last_name,
          email: customerData.email,
          age: customerData.age, // Ensure age is assigned as a number
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

        {tripDetails && ( // Check if tripDetails is available
          <div className="trip-details mb-4">
            <h4>Your Trip Details</h4>
            <Row>
              <Col xs={6}>
                <strong>Package Name:</strong>
              </Col>
              <Col xs={6}>
                <span>{tripDetails.package_name}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <strong>Start Date:</strong>
              </Col>
              <Col xs={6}>
                <span>{tripDetails.start_date}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <strong>End Date:</strong>
              </Col>
              <Col xs={6}>
                <span>{tripDetails.end_date}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <strong>Advance Payment:</strong>
              </Col>
              <Col xs={6}>
                <span
                  style={{
                    textDecoration: tripDetails.discount
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  ₹{tripDetails.advance_payment}
                </span>
                {tripDetails.discount > 0 && (
                  <span>
                    {' '}
                    ₹{tripDetails.advance_payment - tripDetails.discount}
                  </span>
                )}
              </Col>
            </Row>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMobile">
            <Form.Label className="form-label">Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="10 digit Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleMobileChange}
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label className="form-label">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formGender">
                <Form.Label className="form-label">Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAge">
                <Form.Label className="form-label">Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Your Age"
                  name="age"
                  value={formData.age}
                  min="0"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formEmail">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Dropdown for sharing type */}
          <Form.Group controlId="formSharingType" className="mt-3">
            <Form.Label className="form-label">Select Sharing Type</Form.Label>
            <Form.Control
              as="select"
              name="sharingType"
              value={formData.sharingType}
              onChange={handleInputChange}
            >
              <option value="">Select Sharing Type</option>
              <option value="double_sharing">
                Double Sharing - ₹{tripDetails?.double_sharing_price || 0}
              </option>
              <option value="triple_sharing">
                Triple Sharing - ₹{tripDetails?.triple_sharing_price || 0}
              </option>
              <option value="quad_sharing">
                Quad Sharing - ₹{tripDetails?.quad_sharing_price || 0}
              </option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-block mt-3">
            Continue Payment
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default BookingForm;
