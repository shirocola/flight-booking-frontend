import React, { useState } from 'react';
import axios from 'axios';
import styles from './BookingForm.module.scss';

interface BookingFormProps {
  flightId: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ flightId }) => {
  const [passengerName, setPassengerName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setConfirmation(null);
    try {
      const response = await axios.post('https://localhost:3000/bookings', {
        flightId,
        passengerName,
        email,
        paymentDetails,
      });
      setConfirmation('Booking confirmed! Your booking ID is: ' + response.data.id);
    } catch (error) {
      setError('Error creating booking. Please try again later.');
      console.error('Error creating booking:', error);
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
        placeholder="Payment Details"
        value={paymentDetails}
        onChange={(e) => setPaymentDetails(e.target.value)}
        required
        className={styles['input']}
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
