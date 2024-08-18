import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import { isAuthenticated } from './utils/authUtils';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/"
          element={
            isAuthenticated() ? <Home /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
