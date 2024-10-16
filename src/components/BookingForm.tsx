import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BookingForm.css';

interface BookingFormData {
  mobile: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  email: string;
}

const BookingForm: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [formData, setFormData] = useState<BookingFormData>({
    mobile: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    age: '',
    email: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      {' '}
      {/* Add class for styling */}
      <h2>Book a Trip with Indian Travellers Team</h2>
      <label>
        Mobile:
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Next</button>
    </form>
  );
};

export default BookingForm;
