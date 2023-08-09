import React, { useState } from 'react';
import './Signup.css';
import swal from 'sweetalert';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isCleaner, setIsCleaner] = useState(false);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/' + (isCleaner ? 'cleaners' : 'users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          description: isCleaner ? description : undefined,
          password,
          password_confirmation: passwordConfirmation,
          image_url: isCleaner ? imageUrl : undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        swal("Good job!", "You successfully signed up!", "success");
        console.log('Signup successful. JWT token:', data.jwt_token);
      } else {
        const errorData = await response.json();
        swal("Oops!", "Something went wrong, try signing up again!", "error");
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

          {/* Toggle between cleaner and user signup */}
          <div className="role-toggle-wrapper">
            <span className={`toggleOption ${isCleaner ? '' : 'active'}`} onClick={() => setIsCleaner(false)}>
              User
            </span>
            <span className={`toggleOption ${isCleaner ? 'active' : ''}`} onClick={() => setIsCleaner(true)}>
              Cleaner
            </span>
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
              {/* Path for the input icon */}
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
              {/* Path for the input icon */}
            </svg>
            <input
              type="text"
              className="inputField"
              id="username"
              placeholder="UserName"
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
              {/* Path for the input icon */}
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

           {/* Render additional inputs for cleaner role */}
           {isCleaner && (
            <>
              <div className="inputContainer">
                <input
                  type="text"
                  className="inputField"
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="inputContainer">
                <input
                  type="text"
                  className="inputField"
                  id="imageUrl"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </>
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
              {/* Path for the input icon */}
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
              {/* Path for the input icon */}
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
