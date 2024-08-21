
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
npm run dev
```
  

The frontend will run on `https://localhost:5173`.

## Mock Data

### Seeded Flights

The application comes with a set of mock flight data that is automatically seeded into the database. This data is useful for testing and development purposes.

Here are the details of the seeded flights:

| Origin Code | Origin        | Origin Country       | Destination Code | Destination    | Destination Country   | Departure Date | Return Date | Price |
|-------------|---------------|----------------------|------------------|----------------|-----------------------|----------------|-------------|-------|
| JFK         | New York      | United States        | LHR              | London         | United Kingdom        | 2024-09-01     | 2024-09-10  | $750  |
| LHR         | London        | United Kingdom       | JFK              | New York       | United States         | 2024-09-02     |             | $770  |
| NRT         | Tokyo         | Japan                | LAX              | Los Angeles    | United States         | 2024-09-03     | 2024-09-12  | $680  |
| LAX         | Los Angeles   | United States        | NRT              | Tokyo          | Japan                 | 2024-09-04     |             | $690  |
| SYD         | Sydney        | Australia            | SIN              | Singapore      | Singapore             | 2024-09-05     | 2024-09-15  | $500  |
| SIN         | Singapore     | Singapore            | SYD              | Sydney         | Australia             | 2024-09-06     |             | $510  |
| DXB         | Dubai         | United Arab Emirates | CDG              | Paris          | France                | 2024-09-07     | 2024-09-14  | $620  |
| CDG         | Paris         | France               | DXB              | Dubai          | United Arab Emirates  | 2024-09-08     |             | $630  |
| HND         | Tokyo         | Japan                | ICN              | Seoul          | South Korea           | 2024-09-09     |             | $450  |
| ICN         | Seoul         | South Korea          | HND              | Tokyo          | Japan                 | 2024-09-10     |             | $460  |
| JNB         | Johannesburg  | South Africa         | GRU              | São Paulo      | Brazil                | 2024-09-11     | 2024-09-20  | $900  |
| GRU         | São Paulo     | Brazil               | JNB              | Johannesburg   | South Africa          | 2024-09-12     |             | $920  |
| FCO         | Rome          | Italy                | CAI              | Cairo          | Egypt                 | 2024-09-13     | 2024-09-18  | $600  |
| CAI         | Cairo         | Egypt                | FCO              | Rome           | Italy                 | 2024-09-14     |             | $620  |
| BOM         | Mumbai        | India                | DEL              | New Delhi      | India                 | 2024-09-15     |             | $150  |
| DEL         | New Delhi     | India                | BOM              | Mumbai         | India                 | 2024-09-16     | 2024-09-20  | $160  |
| MEX         | Mexico City   | Mexico               | YYZ              | Toronto        | Canada                | 2024-09-17     | 2024-09-24  | $550  |
| YYZ         | Toronto       | Canada               | MEX              | Mexico City    | Mexico                | 2024-09-18     |             | $570  |
| SVO         | Moscow        | Russia               | IST              | Istanbul       | Turkey                | 2024-09-19     | 2024-09-25  | $450  |
| IST         | Istanbul      | Turkey               | SVO              | Moscow         | Russia                | 2024-09-20     |             | $470  |

### Notes:
- The `Return Date` is optional and is only provided for round-trip flights.
- All prices are in USD.
- The flights listed above are automatically seeded into the database when the application is initialized.

This mock data can be used to test booking, searching, and other functionalities within the application.


  

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
