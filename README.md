
# Secure Flight Search and Booking System - Frontend

  

## Overview

  

This repository contains the frontend for a secure flight search and booking system. The frontend is built with React and Vite and connects to the backend APIs for flight search, booking, and user authentication.

  

## Features

  

-  **Flight Search**: Allows users to search for flights by entering origin, destination, and travel dates.

-  **Booking System**: Capture passenger details and payment information securely to book flights.

-  **User Authentication**: Users can log in securely using JWT tokens.

-  **HTTPS**: All communications with the backend are secured using HTTPS.

-  **Form Validation**: Credit card number, CVV, and other input fields are validated to ensure correct data entry.

  

## Technology Stack

  

-  **React**: A JavaScript library for building user interfaces.

-  **Vite**: A fast build tool and development server.

-  **Axios**: A promise-based HTTP client for making API requests.

-  **SCSS**: For styling components with more flexibility and nesting capabilities.

  

## Prerequisites

  

-  **Node.js**: Version 20 or higher

-  **npm**: Version 6 or higher

-  **OpenSSL**: For generating self-signed certificates (if not already done)

  

## Getting Started

  

### Clone the Repository

  

```bash

git  clone  https://github.com/shirocola/flight-booking-frontend.git

cd  flight-booking-frontend
```

  
  

### Install Dependencies

  

```bash

npm install

```

  

### Set Up Environment Variables

  

Create a `.env` file in the root directory with the following content:

  

```bash
VITE_API_URL=https://localhost:3000
```

  

### Generate SSL Certificates

  

For development purposes, you can generate self-signed certificates:

  

```bash
openssl genrsa -out frontend.key 2048

openssl req -new -key frontend.key -out frontend.csr

openssl x509 -req -days 365 -in frontend.csr -signkey frontend.key -out frontend.cert
```

  

### Start the Development Server

  

```bash
`npm run dev`
```
  

The frontend will run on `https://localhost:5173`.

  

## Testing with Mock Credit Card Data

When testing the application, you can use the following mock credit card details:

- **Card Number**: `4111111111111111` (Visa)
- **CVV**: `123`
- **Expiry Date**: `12/24`

These details can be used during the booking process in development or testing environments.

  

### API Endpoints Used

  

-  **POST /auth/login**: Authenticate a user.

-  **GET /flights/search**: Search for flights.

-  **POST /bookings**: Book a flight.

  

## Security Considerations

  

-  **HTTPS**: All traffic is encrypted using SSL.

-  **Input Validation**: Prevents incorrect data entry by validating forms before submission.

-  **Error Handling**: Ensures that sensitive information is not exposed in error messages.

  

## License

  

This project is licensed under the MIT License.
