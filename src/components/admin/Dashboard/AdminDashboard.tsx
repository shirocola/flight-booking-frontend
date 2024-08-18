import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminDashboard.module.scss';

const AdminDashboard: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.post(
        'https://localhost:3000/flights',
        {
          origin,
          destination,
          departureDate,
          returnDate,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Flight created successfully!');
      setOrigin('');
      setDestination('');
      setDepartureDate('');
      setReturnDate('');
      setPrice('');
    } catch (error) {
      setError('Error creating flight. Please try again.');
    }
  };

  return (
    <div className={styles['dashboard-container']}>
      <h2>Admin Dashboard</h2>
      <form className={styles['create-flight-form']} onSubmit={handleCreateFlight}>
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Departure Date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Return Date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
          required
        />
        <button type="submit">Create Flight</button>
      </form>
      {message && <p className={styles['success-message']}>{message}</p>}
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};

export default AdminDashboard;
