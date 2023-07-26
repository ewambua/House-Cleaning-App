// src/App.js

import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css'; // Import your App-level CSS file here for any common styles you might have

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="App">
      {showLogin ? <Login /> : <Signup />}
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
    </div>
  );
}

export default App;
