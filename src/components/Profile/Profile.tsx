import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Profile.module.scss';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

interface Booking {
  id: number;
  flight: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
  };
  active: boolean;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
        const bookingResponse = await axios.get('https://localhost:3000/users/me/bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBookings(bookingResponse.data);
      } catch (error) {
        setError('Failed to load user data or bookings. Please try again.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleDeleteAccount = async () => {
    if (!user) return;

    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`https://localhost:3000/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setError('You do not have permission to perform this action.');
      } else {
        setError('Failed to delete account. Please try again.');
      }
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    if (!window.confirm('Are you sure you want to cancel this booking? There will be no refund.')) {
      return;
    }

    try {
      await axios.put(`https://localhost:3000/bookings/${bookingId}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, active: false } : booking
        )
      );
    } catch (error: any) {
      setError('Failed to cancel booking. Please try again.');
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <Link to="/" className={styles.backToHomeButton}>
        Back to Home
      </Link>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Roles:</strong> {user.roles.join(', ')}</p>

      <h3>Your Bookings</h3>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              {booking.flight.origin} to {booking.flight.destination} on {booking.flight.departureDate}
              {booking.flight.returnDate && `, returning on ${booking.flight.returnDate}`}
              <p>Status: {booking.active ? 'Active' : 'Canceled'}</p>
              {booking.active && (
                <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no bookings.</p>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.deleteButton} onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
