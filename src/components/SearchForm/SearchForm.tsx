import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchForm.module.scss';
import { FaSearch } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import BookingForm from '../BookingForm/BookingForm';

interface Flight {
  id: number;
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
  const [filteredDestinations, setFilteredDestinations] = useState<Airport[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState({
    origin: false,
    destination: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);

  useEffect(() => {
    axios.get<Airport[]>('http://localhost:3000/flights/airports').then((response) => {
      setSuggestions(response.data);
    });
  }, []);

  const handleOriginSelect = (airport: Airport) => {
    setOrigin(`${airport.city} (${airport.code}), ${airport.country}`);
    setDropdownVisible({ ...dropdownVisible, origin: false });
    const filtered = suggestions.filter(
      (suggestion) => suggestion.city !== airport.city
    );
    setFilteredDestinations(filtered);
  };

  const handleDestinationSelect = (airport: Airport) => {
    setDestination(`${airport.city} (${airport.code}), ${airport.country}`);
    setDropdownVisible({ ...dropdownVisible, destination: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Extract the airport codes from origin and destination strings
    const originCodeMatch = origin.match(/\(([^)]+)\)/);
    const destinationCodeMatch = destination.match(/\(([^)]+)\)/);

    // If matches are found, use them; otherwise, fallback to a trimmed version
    const originCode = originCodeMatch ? originCodeMatch[1] : origin.trim();
    const destinationCode = destinationCodeMatch ? destinationCodeMatch[1] : destination.trim();

    const payload = {
      origin: originCode,
      destination: destinationCode,
      departureDate,
      returnDate: returnDate || undefined,
    };

    console.log('Submitting payload:', payload);

    try {
      const response = await axios.get<Flight[]>('http://localhost:3000/flights/search', {
        params: payload,
      });
      setFlights(response.data);

      if (response.data.length === 0) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleBookNow = (flightId: number) => {
    setSelectedFlightId(flightId === selectedFlightId ? null : flightId);
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
          {dropdownVisible.destination && filteredDestinations.length > 0 && (
            <ul className={styles['suggestions']}>
              {filteredDestinations.map((airport) => (
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
                <li key={index} className={styles['flight-item']}>
                  <span className={styles['flight-details']}>
                    {flight.origin} to {flight.destination} on {flight.departureDate}
                    {flight.returnDate && `, returning on ${flight.returnDate}`} - ${flight.price}
                  </span>
                  <div className={styles['action-container']}>
                    <button
                      className={`${styles['book-button']} ${selectedFlightId === flight.id ? styles['cancel-button'] : ''}`}
                      onClick={() => handleBookNow(flight.id)}
                    >
                      {selectedFlightId === flight.id ? 'Cancel' : 'Book Now'}
                    </button>
                  </div>
                  {selectedFlightId === flight.id && (
                    <div className={styles['booking-form-container']}>
                      <BookingForm flightId={flight.id} />
                    </div>
                  )}
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
