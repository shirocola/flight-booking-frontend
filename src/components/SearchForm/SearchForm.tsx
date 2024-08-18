import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchForm.module.scss';
import { FaSearch } from 'react-icons/fa';
import Modal from '../Modal/Modal';

interface Flight {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string; // Optional return date
  price: number;
}

interface Airport {
  code: string;
  city: string;
  country: string;
}

const SearchForm: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState<string | undefined>(undefined); // Allow undefined
  const [flights, setFlights] = useState<Flight[]>([]);
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState({
    origin: false,
    destination: false,
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (origin || destination) {
      axios.get<Airport[]>('http://localhost:3000/flights/airports').then((response) => {
        const filteredSuggestions = response.data.filter((airport) =>
          origin
            ? airport.city.toLowerCase().startsWith(origin.toLowerCase())
            : airport.city.toLowerCase().startsWith(destination.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      });
    } else {
      setSuggestions([]);
    }
  }, [origin, destination]);

  const handleOriginSelect = (airport: Airport) => {
    setOrigin(`${airport.city} (${airport.code}), ${airport.country}`);
    setDropdownVisible({ ...dropdownVisible, origin: false });
  };

  const handleDestinationSelect = (airport: Airport) => {
    setDestination(`${airport.city} (${airport.code}), ${airport.country}`);
    setDropdownVisible({ ...dropdownVisible, destination: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get<Flight[]>('http://localhost:3000/flights/search', {
        params: {
          origin,
          destination,
          departureDate,
          returnDate: returnDate || undefined, // Send returnDate if defined
        },
      });
      setFlights(response.data);

      if (response.data.length === 0) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div className={styles['search-container']}>
      <form className={styles['search-form']} onSubmit={handleSubmit}>
        <div className={styles['input-group']}>
          <label htmlFor="origin">Origin</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            onFocus={() => setDropdownVisible({ ...dropdownVisible, origin: true })}
            onBlur={() => setDropdownVisible({ ...dropdownVisible, origin: false })}
            required
          />
          {dropdownVisible.origin && suggestions.length > 0 && (
            <ul className={styles['suggestions']}>
              {suggestions.map((airport) => (
                <li key={airport.code} onMouseDown={() => handleOriginSelect(airport)}>
                  {airport.city} ({airport.code}), {airport.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => setDropdownVisible({ ...dropdownVisible, destination: true })}
            onBlur={() => setDropdownVisible({ ...dropdownVisible, destination: false })}
            required
          />
          {dropdownVisible.destination && suggestions.length > 0 && (
            <ul className={styles['suggestions']}>
              {suggestions.map((airport) => (
                <li key={airport.code} onMouseDown={() => handleDestinationSelect(airport)}>
                  {airport.city} ({airport.code}), {airport.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="departureDate">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </div>

        <div className={styles['input-group']}>
          <label htmlFor="returnDate">Return Date</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value || undefined)}
          />
        </div>

        <button type="submit" className={styles['search-button']}>
          <FaSearch /> Search
        </button>
      </form>

      <div className={styles['results']}>
        {flights.length > 0 ? (
          <>
            <h2>Search Results</h2>
            <ul>
              {flights.map((flight, index) => (
                <li key={index}>
                  {flight.origin} to {flight.destination} on {flight.departureDate}
                  {flight.returnDate && `, returning on ${flight.returnDate}`} - ${flight.price}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <Modal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        message="No flights found for the selected dates."
      />
    </div>
  );
};

export default SearchForm;
