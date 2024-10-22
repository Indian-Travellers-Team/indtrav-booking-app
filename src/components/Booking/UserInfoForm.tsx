// src/components/UserInfoForm.tsx
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './styles/UserInfoForm.css';

interface UserInfoFormProps {
  formData: {
    mobile: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number | '';
    email: string;
    sharingType: string;
  };
  tripDetails: any; // Accept trip details
  handleMobileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  formData,
  tripDetails,
  handleMobileChange,
  handleInputChange,
  handleSubmit,
}) => {
  return (
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
  );
};

export default UserInfoForm;
