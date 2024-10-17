import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/BookingForm.css';

const BookingForm: React.FC = () => {
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
        <Form>
          <Form.Group controlId="formMobile">
            <Form.Label className="form-label">Mobile</Form.Label>
            <Form.Control type="text" placeholder="10 digit Mobile Number" />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control type="text" placeholder="Your First Name" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label className="form-label">Last Name</Form.Label>
                <Form.Control type="text" placeholder="Your Last Name" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formGender">
                <Form.Label className="form-label">Gender</Form.Label>
                <Form.Control as="select">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAge">
                <Form.Label className="form-label">Age</Form.Label>
                <Form.Control type="number" placeholder="Your Age" min="0" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formEmail">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control type="email" placeholder="Your Email" />
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
