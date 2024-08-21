import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm/SearchForm';
import Logout from '../components/Logout/Logout';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Flight Search</h1>
      <Logout />
      <SearchForm />
      <Link to="/profile">Go to Profile</Link> {/* Add a link to the profile page */}
    </div>
  );
};

export default Home;
