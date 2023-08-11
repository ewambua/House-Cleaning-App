import React, { useState } from 'react';
import './Signup.css';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate


const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isCleaner, setIsCleaner] = useState(false);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image file


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://neatly-api.onrender.com/' + (isCleaner ? 'cleaners' : 'users'), {
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
  
        // Store user ID and JWT token in local storage
        localStorage.setItem('userid', data.user.id);
        localStorage.setItem('jwt_token', data.jwt_token);
        localStorage.setItem('cleanerid', data.cleanerid)
       
        navigate('/landing');
      } else {
        const errorData = await response.json();
        swal("Oops!", "Something went wrong, try signing up again!", "error");
        console.log('Signup failed. Error:', errorData.errors);
      }
    } catch (error) {
      console.error('Error occurred during signup:', error);
    }
  };

    // Handle image selection
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(file);
        // Convert the selected image to a base64 encoded string
        const reader = new FileReader();
        reader.onload = (event) => {
          setImageUrl(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  

  return (
   
    <div className='signup'>
      <div className="heroo">
        <div id="hero" className="heroo">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="main-head">
                 <span className="spanna2">Welcome</span>!
              </h1>
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
              <path d="M8 0a6 6 0 100 12A6 6 0 008 0zm0 10.59A4.6 4.6 0 013.41 8 4.6 4.6 0 018 5.41 4.6 4.6 0 0112.59 8 4.6 4.6 0 018 10.59z" />
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
              <path d="M8 0a6 6 0 100 12A6 6 0 008 0zm0 10.59A4.6 4.6 0 013.41 8 4.6 4.6 0 018 5.41 4.6 4.6 0 0112.59 8 4.6 4.6 0 018 10.59z" />
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
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
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
             <svg
                  className="inputIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#2e2e2e"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.5 3h-1.6L12.7 1.3C12.5 0.6 11.9 0 11.2 0H4.8C4.1 0 3.5 0.6 3.3 1.3L3 2H1.5C0.7 2 0 2.7 0 3.5V13c0 .8.7 1.5 1.5 1.5h13c.8 0 1.5-.7 1.5-1.5V3.5c0-.8-.7-1.5-1.5-1.5zM8 12a4 4 0 110-8 4 4 0 010 8zm5-6h-1.4l-.5-.5a2 2 0 10-2.8 0l-.5.5H4V3h9v3z"/>
                </svg>


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
              <svg
                  className="inputIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#2e2e2e"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.5 3h-1.6L12.7 1.3C12.5 0.6 11.9 0 11.2 0H4.8C4.1 0 3.5 0.6 3.3 1.3L3 2H1.5C0.7 2 0 2.7 0 3.5V13c0 .8.7 1.5 1.5 1.5h13c.8 0 1.5-.7 1.5-1.5V3.5c0-.8-.7-1.5-1.5-1.5zM8 12a4 4 0 110-8 4 4 0 010 8zm5-6h-1.4l-.5-.5a2 2 0 10-2.8 0l-.5.5H4V3h9v3z"/>
                </svg>


                <input
                  type="file"
                  className="inputField"
                  placeholder="Put Image"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  
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
               <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
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
               <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
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

          <p className="auth-switch-text">
                  Already have an account?{' '}
                  <Link to="/login" className="highlightText">
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;




