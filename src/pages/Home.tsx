import React from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import Logout from '../components/Logout/Logout';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Flight Search</h1>
      < Logout />
      <SearchForm />
    </div>
  );
};

export default Home;
