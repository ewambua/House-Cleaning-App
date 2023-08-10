import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import UserProfile from './components/UserProfile';
import AdditionalInfo from './components/additionalInfo';
import Dashboard from './components/DashboardCleaner.js';
import NotificationPage from './components/NotificationPage';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on initial component mount
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!jwtToken);
  }, []);

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  // Function to handle successful login
  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem('jwtToken', token);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwtToken');
  };

  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<AdditionalInfo/>} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AboutUs" element={<AboutUs/>}/>
          <Route path="/NotificationPage" element={<NotificationPage/>}/>



          <Route
            path="/landing"
            element={<LandingPage onLogout={handleLogout} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <LandingPage onLogout={handleLogout} />
              ) : (
                <>
                  {showLogin ? (
                    <Login onSuccess={handleLoginSuccess} />
                  ) : (
                    <Signup />
                  )}
                  
                   
                </>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
