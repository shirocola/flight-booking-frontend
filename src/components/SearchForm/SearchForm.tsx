import React, { useState } from 'react';
import axios from 'axios';
import BookingForm from '../BookingForm/BookingForm';
import styles from './SearchForm.module.scss';

interface Flight {
  id: number;
  origin: string;
  destination: string;
  date: string;
  price: number;
}

const SearchForm: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Flight[]>('http://localhost:3000/flights/search', {
        params: {
          origin,
          destination,
          date: travelDate,
        },
      });
      setFlights(response.data);
    } catch (error) {
      setError('Error fetching flights. Please try again later.');
      console.error('Error fetching flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className={styles['search-form']} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles['search-form__input']}
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
        <input
          type="text"
          className={styles['search-form__input']}
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="date"
          className={styles['search-form__input']}
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          required
        />
        <button type="submit" className={styles['search-form__button']}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className={styles['error']}>{error}</p>}

      <div>
        <h2>Search Results:</h2>
        <ul>
          {flights.map((flight) => (
            <li key={flight.id}>
              {flight.origin} to {flight.destination} on {flight.date} - ${flight.price}
              <button onClick={() => setSelectedFlight(flight)}>Book</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedFlight && (
        <div>
          <h3>Book Flight</h3>
          <BookingForm flightId={selectedFlight.id} />
        </div>
      )}
    </div>
  );
};

export default SearchForm;
