import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logout.module.scss';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button className={styles['logout-button']} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
