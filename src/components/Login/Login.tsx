import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Reset error

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setLoading(false); // Stop loading
      window.location.href = '/'; // Redirect to home page
    } catch (error) {
      setLoading(false); // Stop loading
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-box']}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles['input-group']}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles['error-message']}>{error}</p>}
          <button type="submit" className={styles['login-button']} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
