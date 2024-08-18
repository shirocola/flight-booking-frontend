import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminLogin.module.scss';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://localhost:3000/auth/login', {
        username,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem('admin_token', access_token);
      setLoading(false);
      window.location.href = '/admin/dashboard';
    } catch (error) {
      setLoading(false);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-box']}>
        <h2>Admin Login</h2>
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

export default AdminLogin;
