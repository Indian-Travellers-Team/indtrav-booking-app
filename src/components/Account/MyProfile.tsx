import React, { useState } from 'react';
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Container,
} from 'react-bootstrap';
import {
  Edit2,
  Save,
  X,
  CheckCircle,
  User,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';
import './styles/MyProfile.css';

interface MyProfileProps {
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    mobileNumber: string;
    gender?: string; // <-- added gender here
  };
}

const MyProfile: React.FC<MyProfileProps> = ({ initialData }) => {
  const [userData, setUserData] = useState({ ...initialData });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string | number>('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleEdit = (field: string, value: string | number) => {
    setEditingField(field);
    setTempValue(value);
    if (field === 'mobileNumber') {
      setNewPhone(String(value));
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
    setOtpError('');
    setShowOtp(false);
  };

  const handleSave = (field: string) => {
    if (field === 'mobileNumber' && tempValue !== userData.mobileNumber) {
      setShowOtp(true);
      setNewPhone(String(tempValue));
    } else {
      setUserData({ ...userData, [field]: tempValue });
      setEditingField(null);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      setUserData({ ...userData, mobileNumber: newPhone });
      setOtpVerified(true);
      setOtpError('');
      setTimeout(() => {
        setShowOtp(false);
        setEditingField(null);
        setOtpVerified(false);
        setOtp('');
      }, 2000);
    } else {
      setOtpError('Invalid OTP.');
    }
  };

  const renderField = (
    label: string,
    icon: React.ReactNode,
    value: string | number,
    field: string,
    editable = true,
  ) => (
    <Form.Group as={Row} className="mb-3 align-items-center" controlId={field}>
      <Form.Label
        column
        sm={3}
        className="d-flex align-items-center gap-2 fw-bold text-primary"
      >
        {icon}
        {label}
      </Form.Label>
      <Col sm={6}>
        {editingField === field ? (
          <Form.Control
            type={field === 'age' ? 'number' : 'text'}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        ) : (
          <div className="pt-1">{value}</div>
        )}
      </Col>
      <Col sm={3}>
        {editable && editingField !== field && (
          <Button
            className="profile-edit-btn"
            variant="outline-primary"
            size="sm"
            onClick={() => handleEdit(field, value)}
          >
            <Edit2 size={14} className="me-1" /> Edit
          </Button>
        )}
        {editingField === field && (
          <>
            <Button
              variant="success"
              size="sm"
              className="me-2 mt-2"
              onClick={() => handleSave(field)}
            >
              <Save size={14} className="me-1" /> Save
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={handleCancel}
            >
              <X size={14} className="me-1" /> Cancel
            </Button>
          </>
        )}
      </Col>
    </Form.Group>
  );

  // Additional render for gender field with dropdown and display
  const renderGenderField = () => (
    <Form.Group as={Row} className="mb-3 align-items-center" controlId="gender">
      <Form.Label
        column
        sm={3}
        className="d-flex align-items-center gap-2 fw-bold text-primary"
      >
        <User size={18} />
        Gender
      </Form.Label>
      <Col sm={6}>
        {editingField === 'gender' ? (
          <Form.Select
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
        ) : (
          <div className="pt-1 text-capitalize">
            {userData.gender || 'Not specified'}
          </div>
        )}
      </Col>
      <Col sm={3}>
        {editingField !== 'gender' ? (
          <Button
            className="profile-edit-btn"
            variant="outline-primary"
            size="sm"
            onClick={() => handleEdit('gender', userData.gender || 'male')}
          >
            <Edit2 size={14} className="me-1" /> Edit
          </Button>
        ) : (
          <>
            <Button
              variant="success"
              size="sm"
              className="me-2 mt-2"
              onClick={() => handleSave('gender')}
            >
              <Save size={14} className="me-1" /> Save
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={handleCancel}
            >
              <X size={14} className="me-1" /> Cancel
            </Button>
          </>
        )}
      </Col>
    </Form.Group>
  );

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Header className="text-Black">
          <h4 className="mb-0">My Profile</h4>
          <p className="mb-0 small">
            View and manage your personal information
          </p>
        </Card.Header>
        <Card.Body>
          <div className="mb-4 d-flex align-items-center">
            <div className="bg-indigo-100 rounded-circle p-3">
              <User size={40} className="text-indigo-700" />
            </div>
            <div className="ms-3">
              <h5 className="mb-1">
                {userData.firstName} {userData.lastName}
              </h5>
              <p className="text-muted mb-0">{userData.email}</p>
            </div>
          </div>

          {renderField(
            'First Name',
            <User size={18} />,
            userData.firstName,
            'firstName',
          )}
          {renderField(
            'Last Name',
            <User size={18} />,
            userData.lastName,
            'lastName',
          )}
          {renderField(
            'Email Address',
            <Mail size={18} />,
            userData.email,
            'email',
            false,
          )}
          {renderGenderField()}
          {renderField('Age', <Calendar size={18} />, userData.age, 'age')}
          {renderField(
            'Mobile Number',
            <Phone size={18} />,
            userData.mobileNumber,
            'mobileNumber',
          )}

          {showOtp && (
            <Card className="mt-4">
              <Card.Body>
                <Form.Group className="mb-3" controlId="otp">
                  <Form.Label>
                    Enter OTP sent to <strong>{newPhone}</strong>
                  </Form.Label>
                  <Form.Control
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6-digit code"
                  />
                  {otpError && (
                    <Alert variant="danger" className="mt-2">
                      {otpError}
                    </Alert>
                  )}
                </Form.Group>
                <Button onClick={handleVerifyOtp} className="me-2">
                  <CheckCircle size={16} className="me-1" /> Verify
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  <X size={16} className="me-1" /> Cancel
                </Button>
                {otpVerified && (
                  <Alert variant="success" className="mt-3">
                    Phone number verified successfully!
                  </Alert>
                )}
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyProfile;
