import React, { useState } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import './styles/UserInfoForm.css'; // Ensure this points to the UserInfoForm.css
import { createBooking } from '../../api/bookingService'; // Import for single booking
import { createMultiBooking } from '../../api/bookingService'; // Import for multiple bookings

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
  handleInputChange: (e: React.ChangeEvent<HTMLElement>) => void; // Change to HTMLElement
  token: string; // Prop for the Firebase token
  isMultipleBooking: boolean; // Indicates if this is for multiple bookings
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  formData,
  tripDetails,
  handleMobileChange,
  handleInputChange,
  token,
  isMultipleBooking,
}) => {
  const [additionalPersons, setAdditionalPersons] = useState<any[]>([{}]); // State for additional persons
  const [showModal, setShowModal] = useState(false); // State for the modal visibility

  // Add an additional person field dynamically
  const addPersonFields = () => {
    setAdditionalPersons((prev) => [...prev, {}]);
  };

  // Handle input change for additional persons
  const handlePersonChange = (
    index: number,
    e: React.ChangeEvent<HTMLElement>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setAdditionalPersons((prev) => {
      const updatedPersons = [...prev];
      updatedPersons[index] = {
        ...updatedPersons[index],
        [name]: value,
      };
      return updatedPersons;
    });
  };

  // Remove an additional person field
  const removePerson = (index: number) => {
    setAdditionalPersons((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle booking submission
  const handleBooking = async () => {
    const bookingData = {
      trip_id: tripDetails?.id || null, // Pass trip ID from trip details
      sharing_type: formData.sharingType || null,
      primary_person: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        age: formData.age ? formData.age.toString() : null, // Convert age to string
        mobile: formData.mobile,
      },
      additional_persons: additionalPersons.map((person) => ({
        first_name: person.firstName,
        last_name: person.lastName,
        gender: person.gender,
        age: person.age ? person.age.toString() : null, // Convert age to string
      })),
    };

    try {
      const response = await createMultiBooking(bookingData, token);
      if (response.status === 'success') {
        console.log('Multi booking successful:', response.message); // Log success
      }
    } catch (error) {
      console.error('Error creating multi booking:', error); // Log error
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true); // Show the modal on submit
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* Primary User Info Section */}
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

        {/* Sharing Type Dropdown */}
        <Form.Group controlId="formSharingType" className="mt-3">
          <Form.Label className="form-label">Select Sharing Type</Form.Label>
          <Form.Control
            as="select"
            name="sharingType"
            value={formData.sharingType}
            onChange={handleInputChange}
          >
            <option value="">Select Sharing Type</option>
            <option value="double">
              Double Sharing - ₹{tripDetails?.double_sharing_price || 0}
            </option>
            <option value="triple">
              Triple Sharing - ₹{tripDetails?.triple_sharing_price || 0}
            </option>
            <option value="quad">
              Quad Sharing - ₹{tripDetails?.quad_sharing_price || 0}
            </option>
          </Form.Control>
        </Form.Group>

        {/* Additional Persons Section */}
        {isMultipleBooking && (
          <>
            <h4 className="mt-4 add-more-persons-title">👥 Add More Persons</h4>
            {additionalPersons.map((_, index) => (
              <div key={index} className="additional-person-fields mb-3">
                <Row>
                  <Col md={4}>
                    <Form.Group controlId={`firstName${index}`}>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={(e) => handlePersonChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`lastName${index}`}>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={(e) => handlePersonChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`age${index}`}>
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Age"
                        name="age"
                        min="0"
                        onChange={(e) => handlePersonChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId={`gender${index}`}>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        onChange={(e) => handlePersonChange(index, e)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="d-flex align-items-end">
                    <Button
                      variant="danger"
                      onClick={() => removePerson(index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
            <Button variant="info" onClick={addPersonFields} className="mt-3">
              ➕ Add Another Person
            </Button>
          </>
        )}

        <Button variant="primary" type="submit" className="btn-block mt-3">
          Continue To Payment
        </Button>
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to proceed with the booking?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleBooking();
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserInfoForm;
