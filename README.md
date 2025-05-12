# Booking Application

This Booking Application allows users to book trips for themselves and others. It integrates with Firebase for authentication and provides a seamless user experience. Below are the key features and functionalities of the application.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Demo](#demo)

## Features

1. **User Authentication**: 
   - Users can sign up or log in using email and password or Google account.
   - Email verification is sent upon signing up.

2. **Trip Booking**:
   - Users can select a trip and book it for themselves.
   - Users can also book trips for multiple persons, adding their details dynamically.

3. **Dynamic Form Filling**:
   - The application fetches user details based on the mobile number entered.
   - All user details are pre-filled if available, enhancing user experience.

4. **Multi-Person Booking**:
   - Users can add additional persons to their booking.
   - The form allows the addition and removal of additional person fields.

5. **Responsive Design**:
   - The application is designed to work seamlessly on both desktop and mobile devices.

6. **Firebase Integration**:
   - Uses Firebase for authentication, including managing user sessions and access tokens.

7. **API Integration**:
   - Connects to a backend API for booking trips and managing customer data.
   - Supports both single and multiple booking APIs.

## Technologies Used

- **Frontend**: React, TypeScript, React-Bootstrap
- **Backend**: Django REST Framework (for APIs)
- **Database**: Postgres
- **Authentication**: Firebase Authentication
- **State Management**: Redux 

## Demo 
- https://www.loom.com/share/3ea617ea04714b92a5a76b2c6a6e0394?sid=b73bdadf-23b7-47bd-8dc6-b523535c899b
