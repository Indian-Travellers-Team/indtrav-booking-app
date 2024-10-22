import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { fetchCustomerData } from '../api/customerService';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchTripDetails } from '../api/tripService';
import '../styles/BookingForm.css';

interface BookingFormData {
  mobile: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number | '';
  email: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    mobile: '',
    firstName: '',
    lastName: '',
    gender: 'male',
    age: '',
    email: '',
  });

  const [tripDetails, setTripDetails] = useState<any>(null);
  const tripId = useSelector((state: RootState) => state.trip.tripId);
  const userEmail = useSelector((state: RootState) => state.user.email); // Get user email from Redux store

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
    // Prefill email if userEmail is available
    if (userEmail) {
      setFormData((prevData) => ({
        ...prevData,
        email: userEmail,
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

        {tripDetails && (
          <div className="trip-details mb-4">
            <h3>Trip Details</h3>
            <p>
              <strong>Package Name:</strong> {tripDetails.package_name}
            </p>
            <p>
              <strong>Start Date:</strong> {tripDetails.start_date}
            </p>
            <p>
              <strong>End Date:</strong> {tripDetails.end_date}
            </p>
            <p>
              <strong>Total Days:</strong> {tripDetails.total_days}
            </p>
            <p>
              <strong>Advance Payment:</strong> ${tripDetails.advance_payment}
            </p>
            <p>
              <strong>Discount:</strong> ${tripDetails.discount}
            </p>
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
          <Button variant="primary" type="submit" className="btn-block mt-3">
            Continue Payment
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default BookingForm;
