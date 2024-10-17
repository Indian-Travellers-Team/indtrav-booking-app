import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { fetchCustomerData } from '../api/customerService';
import '../styles/BookingForm.css';

// Define the state type for form data
interface BookingFormData {
  mobile: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number | ''; // Allow age to be a number or empty string
  email: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    mobile: '',
    firstName: '',
    lastName: '',
    gender: 'male',
    age: '', // Start with empty string for age
    email: '',
  });

  // Update the type for the event parameter
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMobile">
            <Form.Label className="form-label">Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="10 digit Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleMobileChange} // Use this for mobile input
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
                  onChange={handleInputChange} // Use the generic handler for other fields
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
                  onChange={handleInputChange} // Use the generic handler for other fields
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
                  onChange={handleInputChange} // Use the generic handler for other fields
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
              onChange={handleInputChange} // Use the generic handler for other fields
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-block mt-3">
            Next
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default BookingForm;
