import React, { useState } from 'react';
import { Row, Col, Form, Button, Modal, Alert } from 'react-bootstrap';
import './styles/UserInfoForm.css';
import { createBooking } from '../../api/bookingService';
import { createMultiBooking } from '../../api/bookingService';
import { useNavigate } from 'react-router-dom';

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
  tripDetails: any;
  handleMobileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLElement>) => void;
  token: string;
  isMultipleBooking: boolean;
}

// Define an interface for validation errors
interface ValidationErrors {
  [key: string]: string[];
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  formData,
  tripDetails,
  handleMobileChange,
  handleInputChange,
  token,
  isMultipleBooking,
}) => {
  const [additionalPersons, setAdditionalPersons] = useState<any[]>([{}]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors | null>(null);

  const navigate = useNavigate();

  // Form validation state
  const [errors, setErrors] = useState({
    mobile: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    sharingType: '',
  });

  // Additional persons validation
  const [personErrors, setPersonErrors] = useState<
    Array<{ [key: string]: string }>
  >([{}]);

  // Add an additional person field
  const addPersonFields = () => {
    setAdditionalPersons((prev) => [...prev, {}]);
    setPersonErrors((prev) => [...prev, {}]);
  };

  // Handle additional person input
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

    // Clear error when user types
    setPersonErrors((prev) => {
      const newErrors = [...prev];
      if (newErrors[index]) {
        newErrors[index] = { ...newErrors[index], [name]: '' };
      }
      return newErrors;
    });
  };

  // Remove an additional person
  const removePerson = (index: number) => {
    setAdditionalPersons((prev) => prev.filter((_, i) => i !== index));
    setPersonErrors((prev) => prev.filter((_, i) => i !== index));
  };

  // Validate form before submission
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      mobile: '',
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      sharingType: '',
    };

    // Primary person validation
    if (!formData.mobile || formData.mobile.length !== 10) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!formData.firstName || formData.firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName || formData.lastName.trim() === '') {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (formData.age === '') {
      newErrors.age = 'Age is required';
      isValid = false;
    }

    if (!formData.sharingType) {
      newErrors.sharingType = 'Please select a sharing type';
      isValid = false;
    }

    setErrors(newErrors);

    // Additional persons validation
    if (isMultipleBooking && additionalPersons.length > 0) {
      const newPersonErrors = additionalPersons.map((person) => {
        const personError: { [key: string]: string } = {};

        if (!person.firstName || person.firstName.trim() === '') {
          personError.firstName = 'First name is required';
          isValid = false;
        }

        if (!person.lastName || person.lastName.trim() === '') {
          personError.lastName = 'Last name is required';
          isValid = false;
        }

        if (!person.age) {
          personError.age = 'Age is required';
          isValid = false;
        }

        if (!person.gender) {
          personError.gender = 'Gender is required';
          isValid = false;
        }

        return personError;
      });

      setPersonErrors(newPersonErrors);
    }

    return isValid;
  };

  // Handle booking submission
  const handleBooking = async () => {
    setIsSubmitting(true);
    setApiError(null);
    setValidationErrors(null);

    try {
      const bookingData: any = {
        trip_id: tripDetails?.id || null,
        sharing_type: formData.sharingType || null,
        primary_person: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          gender: formData.gender,
          age: formData.age ? formData.age.toString() : null,
          mobile: formData.mobile,
          email: formData.email,
        },
        // only include additional_persons when multi booking
        ...(isMultipleBooking
          ? {
              additional_persons: additionalPersons.map((person) => ({
                first_name: person.firstName || '',
                last_name: person.lastName || '',
                gender: person.gender || 'male',
                age: person.age ? person.age.toString() : '',
              })),
            }
          : {}),
      };

      const response = await createMultiBooking(bookingData, token);

      if (response.status === 'success' && response.booking_id) {
        // Redirect on success
        navigate(`/booking/success?booking_id=${response.booking_id}`);
        return;
      }
    } catch (error: any) {
      console.error('Error creating multi booking:', error);

      if (error.response?.data) {
        if (error.response.data.status === 'error') {
          if (typeof error.response.data.message === 'object') {
            setValidationErrors(error.response.data.message);
          } else {
            setApiError(
              error.response.data.message || 'An error occurred during booking',
            );
          }
        } else {
          setApiError('An error occurred during booking. Please try again.');
        }
      } else {
        setApiError(
          'Network error. Please check your connection and try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous errors
    setApiError(null);
    setValidationErrors(null);

    // Validate form before showing confirmation modal
    if (validateForm()) {
      setShowModal(true);
    }
  };

  // Map API validation error fields to form fields
  const mapApiErrorToField = (field: string): string => {
    const mapping: { [key: string]: string } = {
      first_name: 'firstName',
      last_name: 'lastName',
      mobile: 'mobile',
      age: 'age',
      email: 'email',
      sharing_type: 'sharingType',
    };

    return mapping[field] || field;
  };

  // Update form errors from API validation errors
  const processApiErrors = () => {
    if (!validationErrors) return;

    // Create a new errors object
    const newErrors = { ...errors };

    // Process each error field
    Object.entries(validationErrors).forEach(([field, messages]) => {
      const mappedField = mapApiErrorToField(field);

      if (mappedField in newErrors) {
        // @ts-ignore - We know this field exists
        newErrors[mappedField] = messages[0]; // Get first error message
      }
    });

    setErrors(newErrors);
  };

  // Process API validation errors when they change
  React.useEffect(() => {
    if (validationErrors) {
      processApiErrors();
    }
  }, [validationErrors]);

  return (
    <>
      <div className="mountain-user-info-form">
        <div className="section-header">
          <h3 className="mountain-section-title">
            <span className="mountain-title-inner">Your Information</span>
          </h3>
          <div className="mountain-divider small-divider">
            <div className="mountain-peak"></div>
          </div>
        </div>

        {/* Show API error if any */}
        {apiError && (
          <Alert variant="danger" className="mountain-alert">
            {apiError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="booking-form">
          {/* Primary User Info Section */}
          <Form.Group controlId="formMobile" className="form-group-mountain">
            <Form.Label className="form-label-mountain">
              Mobile Number
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="10 digit Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleMobileChange}
              className={`mountain-input ${errors.mobile ? 'is-invalid' : ''}`}
              isInvalid={!!errors.mobile}
            />
            {errors.mobile && (
              <Form.Control.Feedback type="invalid">
                {errors.mobile}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group
                controlId="formFirstName"
                className="form-group-mountain"
              >
                <Form.Label className="form-label-mountain">
                  First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`mountain-input ${errors.firstName ? 'is-invalid' : ''}`}
                  isInvalid={!!errors.firstName}
                />
                {errors.firstName && (
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                controlId="formLastName"
                className="form-group-mountain"
              >
                <Form.Label className="form-label-mountain">
                  Last Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`mountain-input ${errors.lastName ? 'is-invalid' : ''}`}
                  isInvalid={!!errors.lastName}
                />
                {errors.lastName && (
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group
                controlId="formGender"
                className="form-group-mountain"
              >
                <Form.Label className="form-label-mountain">Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mountain-select"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAge" className="form-group-mountain">
                <Form.Label className="form-label-mountain">Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Your Age"
                  name="age"
                  value={formData.age}
                  min="0"
                  onChange={handleInputChange}
                  className={`mountain-input ${errors.age ? 'is-invalid' : ''}`}
                  isInvalid={!!errors.age}
                />
                {errors.age && (
                  <Form.Control.Feedback type="invalid">
                    {errors.age}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formEmail" className="form-group-mountain">
            <Form.Label className="form-label-mountain">
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`mountain-input ${errors.email ? 'is-invalid' : ''}`}
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* Sharing Type Dropdown */}
          <Form.Group
            controlId="formSharingType"
            className="form-group-mountain mt-3"
          >
            <Form.Label className="form-label-mountain">
              Select Sharing Type
            </Form.Label>
            <Form.Control
              as="select"
              name="sharingType"
              value={formData.sharingType}
              onChange={handleInputChange}
              className={`mountain-select ${errors.sharingType ? 'is-invalid' : ''}`}
              isInvalid={!!errors.sharingType}
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
            {errors.sharingType && (
              <Form.Control.Feedback type="invalid">
                {errors.sharingType}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* Additional Persons Section */}
          {isMultipleBooking && (
            <div className="additional-persons-section">
              <div className="section-header mt-4">
                <h4 className="mountain-section-title">
                  <span className="mountain-title-inner">
                    👥 Add More Travelers
                  </span>
                </h4>
                <div className="mountain-divider small-divider">
                  <div className="mountain-peak"></div>
                </div>
              </div>

              {additionalPersons.map((person, index) => (
                <div key={index} className="additional-person-card mb-3">
                  <Row>
                    <Col md={4}>
                      <Form.Group
                        controlId={`firstName${index}`}
                        className="form-group-mountain"
                      >
                        <Form.Label className="form-label-mountain">
                          First Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={person.firstName || ''}
                          onChange={(e) => handlePersonChange(index, e)}
                          className={`mountain-input ${personErrors[index]?.firstName ? 'is-invalid' : ''}`}
                          isInvalid={!!personErrors[index]?.firstName}
                        />
                        {personErrors[index]?.firstName && (
                          <Form.Control.Feedback type="invalid">
                            {personErrors[index].firstName}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group
                        controlId={`lastName${index}`}
                        className="form-group-mountain"
                      >
                        <Form.Label className="form-label-mountain">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={person.lastName || ''}
                          onChange={(e) => handlePersonChange(index, e)}
                          className={`mountain-input ${personErrors[index]?.lastName ? 'is-invalid' : ''}`}
                          isInvalid={!!personErrors[index]?.lastName}
                        />
                        {personErrors[index]?.lastName && (
                          <Form.Control.Feedback type="invalid">
                            {personErrors[index].lastName}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group
                        controlId={`age${index}`}
                        className="form-group-mountain"
                      >
                        <Form.Label className="form-label-mountain">
                          Age
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Age"
                          name="age"
                          min="0"
                          value={person.age || ''}
                          onChange={(e) => handlePersonChange(index, e)}
                          className={`mountain-input ${personErrors[index]?.age ? 'is-invalid' : ''}`}
                          isInvalid={!!personErrors[index]?.age}
                        />
                        {personErrors[index]?.age && (
                          <Form.Control.Feedback type="invalid">
                            {personErrors[index].age}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        controlId={`gender${index}`}
                        className="form-group-mountain"
                      >
                        <Form.Label className="form-label-mountain">
                          Gender
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="gender"
                          value={person.gender || 'male'}
                          onChange={(e) => handlePersonChange(index, e)}
                          className={`mountain-select ${personErrors[index]?.gender ? 'is-invalid' : ''}`}
                          isInvalid={!!personErrors[index]?.gender}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Form.Control>
                        {personErrors[index]?.gender && (
                          <Form.Control.Feedback type="invalid">
                            {personErrors[index].gender}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6} className="d-flex align-items-end">
                      <Button
                        variant="danger"
                        onClick={() => removePerson(index)}
                        className="mountain-remove-btn"
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}

              <Button
                variant="info"
                onClick={addPersonFields}
                className="mountain-add-btn mt-3"
              >
                ➕ Add Another Person
              </Button>
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            className="mountain-submit-btn mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Continue To Payment'}
          </Button>
        </Form>
      </div>

      {/* Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="mountain-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to proceed with this booking?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="mountain-cancel-btn"
            disabled={isSubmitting}
          >
            No, Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleBooking();
              setShowModal(false);
            }}
            className="mountain-confirm-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Yes, Book Now'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserInfoForm;
