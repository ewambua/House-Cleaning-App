import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('user'); // Default role is set to 'user'
  const [showCheckbox, setShowCheckbox] = useState(false); // State to control checkbox visibility

  const handleRoleToggle = () => {
    const newRole = role === 'user' ? 'cleaner' : 'user';
    setRole(newRole);
    console.log('Selected Role:', newRole);
  };

  const handleShowCheckbox = () => {
    setShowCheckbox(!showCheckbox);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users', { // Change '/register' to '/users' to match the Rails UsersController's 'create' action
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username, // Include the username in the request body
          email,
          password,
          password_confirmation: passwordConfirmation,
          is_admin: role === 'cleaner',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the JWT token to local storage or state if needed
        console.log('Signup successful. JWT token:', data.jwt_token);
      } else {
        const errorData = await response.json();
        // Handle signup error
        console.log('Signup failed. Error:', errorData.errors);
      }
    } catch (error) {
      console.error('Error occurred during signup:', error);
    }
  };

  return (
    <>
      <div className='signup'>
        <form onSubmit={handleSubmit} className="form_main">
          <p className="heading">Signup</p>

          {/* Role Toggle with arrow icon */}
          <div className="role-toggle-wrapper" onClick={handleShowCheckbox}>
            <span className="toggleOption">{role === 'user' ? 'User' : 'Join as Cleaner'}</span>
            <svg
              className={`arrow-icon ${showCheckbox ? 'rotate' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M8 14.222L1.456 7.368 2.877 6l5.123 5.128L13.125 6l1.42 1.368z" />
            </svg>
          </div>

          {/* Checkbox for cleaner role */}
          {showCheckbox && (
            <div className="checkbox-wrapper-41">
              <input type="checkbox" id="roleCheckbox" checked={role === 'cleaner'} onChange={handleRoleToggle} />
              <label htmlFor="roleCheckbox">
                <span className="toggleOption">Cleaner</span>
              </label>
            </div>
          )}

          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path d="..." />
            </svg>
            <input
              type="text"
              className="inputField"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path d="..." />
            </svg>
            <input
              type="text"
              className="inputField"
              id="username" // Add the 'username' input field
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path d="..." />
            </svg>
            <input
              type="email"
              className="inputField"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path d="..." />
            </svg>
            <input
              type="password"
              className="inputField"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path d="..." />
            </svg>
            <input
              type="password"
              className="inputField"
              id="password_confirmation"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <button className="btn1" type="submit">
            Signup
          </button>
          <a className="forgotLink" href="#">
            Forgot your password?
          </a>
        </form>
      </div>
    </>
  );
};

export default Signup;
