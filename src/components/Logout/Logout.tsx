import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logout.module.scss';

const Logout: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <button
      className={`${styles['logout-button']} ${isVisible ? '' : styles['hidden']}`}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
