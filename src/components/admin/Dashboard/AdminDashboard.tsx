// src/components/AdminDashboard/AdminDashboard.tsx

import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminDashboard.module.scss';

const AdminDashboard: React.FC = () => {
  const [formData, setFormData] = useState({
    originCode: '',
    origin: '',
    originCountry: '',
    destinationCode: '',
    destination: '',
    destinationCountry: '',
    departureDate: '',
    returnDate: '',
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:3000/flights', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Flight created successfully!');
    } catch (error) {
      console.error('Error creating flight:', error);
      alert('Failed to create flight. Please try again.');
    }
  };

  return (
    <div className={styles['admin-dashboard']}>
      <h1>Create New Flight</h1>
      <form onSubmit={handleSubmit} className={styles['flight-form']}>
        <input
          type="text"
          name="originCode"
          placeholder="Origin Code"
          value={formData.originCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="origin"
          placeholder="Origin"
          value={formData.origin}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="originCountry"
          placeholder="Origin Country"
          value={formData.originCountry}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destinationCode"
          placeholder="Destination Code"
          value={formData.destinationCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destinationCountry"
          placeholder="Destination Country"
          value={formData.destinationCountry}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="departureDate"
          placeholder="Departure Date"
          value={formData.departureDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="returnDate"
          placeholder="Return Date (Optional)"
          value={formData.returnDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles['submit-button']}>
          Create Flight
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
