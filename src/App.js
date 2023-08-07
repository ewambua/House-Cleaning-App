import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile.jsx';

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
          {/* Add the /landing route */}
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
                  <button className='btn2' onClick={handleToggleForm}>
                    {showLogin ? (
                      <>
                        <span className="custom-text">Don't have an account? </span>
                        <span className="highlightText">Sign up</span>
                      </>
                    ) : (
                      <>
                        <span className="custom-text">Already have an account? </span>
                        <span className="highlightText">Log in</span>
                      </>
                    )}
                  </button>
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
