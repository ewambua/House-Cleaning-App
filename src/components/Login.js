import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import swal from 'sweetalert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCleanerLogin, setIsCleanerLogin] = useState(false);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const loginType = isCleanerLogin ? 'cleaner/login' : 'login';
      const apiUrl = `https://neatly-api.onrender.com/${loginType}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('cleanerid', data.cleanerid);
        localStorage.setItem('userRole', isCleanerLogin ? 'cleaner' : 'user');

        setShowSuccess(true);

        navigate('/landing'); // Common action for both cleaner and user login
      } else {
        const errorData = await response.json();
        swal("Oops!", "Something went wrong, make sure to enter correct email and password!", "error");
        console.log('Login failed. Error:', errorData.errors);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    } finally {
      setIsLoading(false);
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

              {isLoading && (
              <div className="loader-overlay">
                <div className="loader">
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
            )}

{!isLoading && showSuccess ? (
              <div className="success-message">Login successful!</div>
            ) : (
              
              <form onSubmit={handleSubmit} className="form_main">
                <div className="toggle-container">
                  <label htmlFor="toggle" className="toggle-label">
                    {isCleanerLogin ? 'Cleaner Login' : 'User Login'}
                  </label>
                  <input
                    type="checkbox"
                    id="toggle"
                    className="toggle-input"
                    checked={isCleanerLogin}
                    onChange={() => setIsCleanerLogin(prevState => !prevState)}
                  />
                </div>
                <p className="heading">Login</p>
                <div className="inputContainer">
                  <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
                    <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                  </svg>
                  <input type="text" className="inputField" id="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="inputContainer">
                  <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                  </svg>
                  <input type="password" className="inputField" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button id="button" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="loader">
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>
                <a className="forgotLink" href="#">Forgot your password?</a>
                {showSuccess && <div className="success-message">Login successful!</div>}

                <p className="auth-switch-text">
                  Don't Have an account?{' '}
                  <Link to="/signUp" className="highlightText">
                    Sign Up
                  </Link>
                </p>
              </form>
              
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
