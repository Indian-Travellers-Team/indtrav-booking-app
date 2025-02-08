import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { sendCallbackRequest } from '../api/callbackService'; // Import the API service

interface CallbackModalProps {
  show: boolean;
  onHide: () => void;
  packageName: string;
  packageId: number;
}

const CallbackModal: React.FC<CallbackModalProps> = ({
  show,
  onHide,
  packageName,
  packageId,
}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');

  // Update the message whenever the packageName changes
  useEffect(() => {
    setMessage(`Requesting Callback for ${packageName}`);
  }, [packageName]);

  const handleSendRequest = async () => {
    try {
      const requestData = {
        package: packageId,
        name,
        mobile: mobileNumber,
        message,
      };
      console.log('Sending Callback Request:', requestData);
      await sendCallbackRequest(requestData);
      onHide();
    } catch (error) {
      console.error('Error sending callback request:', error);
      alert('Failed to send the callback request. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request Callback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="callbackName">
            <Form.Label>Your Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="callbackMobileNumber" className="mt-3">
            <Form.Label>Mobile Number:</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="callbackMessage" className="mt-3">
            <Form.Label>Message:</Form.Label>
            <Form.Control as="textarea" rows={3} value={message} readOnly />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSendRequest}>
          Send Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CallbackModal;
