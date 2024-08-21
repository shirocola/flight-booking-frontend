import React, { useState } from 'react';
import axios from 'axios';
import styles from './BookingForm.module.scss';

interface BookingFormProps {
  flightId: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ flightId }) => {
  const [passengerName, setPassengerName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const validateCardNumber = (number: string) => {
    const regex = /^[0-9]{16}$/;
    return regex.test(number) && luhnCheck(number);
  };

  const luhnCheck = (number: string) => {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
      let intVal = parseInt(number[i]);
      if (i % 2 === 0) {
        intVal *= 2;
        if (intVal > 9) {
          intVal -= 9;
        }
      }
      sum += intVal;
    }
    return sum % 10 === 0;
  };

  const handleCardNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, '');
    setCardNumber(value);
  };

  const handleCVVInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, '');
    setCardCVV(value);
  };

  const validateExpiryDate = (expiry: string) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(expiry)) {
      return false;
    }
    const [month, year] = expiry.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setConfirmation(null);
  
    if (!validateCardNumber(cardNumber)) {
      setError('Invalid credit card number. Please check and try again.');
      setIsSubmitting(false);
      return;
    }
  
    if (!validateExpiryDate(cardExpiry)) {
      setError('Invalid expiry date. Please check and try again.');
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post('https://localhost:3000/bookings', {
        flightId,
        passengerName,
        email,
        cardNumber,
        cardCVV,
        cardExpiry,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });      
      setConfirmation('Booking confirmed! Your booking ID is: ' + response.data.id);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Booking failed: ${error.response.data.message}`);
      } else {
        setError('Error creating booking. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles['booking-form']} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Passenger Name"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        required
        className={styles['input']}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles['input']}
      />
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onInput={handleCardNumberInput}
        required
        className={styles['input']}
        maxLength={16}
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <input
        type="password"
        placeholder="CVV"
        value={cardCVV}
        onInput={handleCVVInput}
        required
        className={styles['input']}
        maxLength={4}
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <input
        type="text"
        placeholder="Expiry Date (MM/YY)"
        value={cardExpiry}
        onChange={(e) => setCardExpiry(e.target.value)}
        required
        className={styles['input']}
        maxLength={5}
      />
      <button type="submit" className={styles['submit-button']} disabled={isSubmitting}>
        {isSubmitting ? 'Booking...' : 'Book Flight'}
      </button>

      {error && <p className={styles['error']}>{error}</p>}
      {confirmation && <p className={styles['confirmation']}>{confirmation}</p>}
    </form>
  );
};

export default BookingForm;
