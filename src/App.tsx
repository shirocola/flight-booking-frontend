import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import { isAuthenticated } from './utils/authUtils';
import AdminLogin from './components/admin/Login/AdminLogin';
import AdminDashboard from './components/admin/Dashboard/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
