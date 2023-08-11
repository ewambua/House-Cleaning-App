import React, { useState, useEffect } from 'react';
import './NotificationPage.css';
import { Link } from 'react-router-dom';

const NotificationPage = () => {
  const [userData, setUserData] = useState({});
  const [requests, setRequests] = useState([]);
  const [sortBy, setSortBy] = useState('mostRecent');

  useEffect(() => {
    // Fetch user data using the user ID from local storage
    const userId = localStorage.getItem('userId'); // Assuming 'userId' is the key used to store the user ID

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://neatly-api.onrender.com/users/${userId}`); // Replace with your API endpoint
        const userData = await response.json();

        setUserData(userData);
        setRequests(userData.requests);

        console.log(userData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, []);

  // Calculate stats
  const totalRequests = requests.length;
  const acceptedRequests = requests.filter(request => request.status === 'accepted').length;
  const deniedRequests = requests.filter(request => request.status === 'denied').length;

  // Sort requests based on the selected sorting option
  const sortedRequests = [...requests].sort((a, b) => {
    if (sortBy === 'mostRecent') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at);
    } else {
      // Add additional sorting options here if needed
      return 0;
    }
  });

    // Function to show a notification message
  const showNotification = (message) => {
    setNotificationMessage(message);
  };

  return (
    <div className="notification-container">
      <h1 className="notification-title">Notifications</h1>
      <div className="header">
        <Link to="/landing" className="back-button">
          Back to Landing
        </Link>
        
      </div>
      
      <div className="sort-container">
        <label htmlFor="sort" className="sort-label">Sort by:</label>
        <select id="sort" className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="mostRecent">Most Recent</option>
          <option value="oldest">Oldest</option>
          
        </select>
      </div>
      <div className="main-content">
      <div className="notification-list">
        {sortedRequests.map((request) => (
          <div className={`notification-item ${request.status}`} key={request.id}>
            <img className="notification-icon" src="https://www.example.com/accept-icon.png" alt="Accept Icon" />
            <div className="notification-content">
              <p className="notification-text">
                Your cleaning request for {request.task_one}, {request.task_two}, and {request.task_three} has been <span className='stato1'>{request.status === 'accepted' ? 'accepted' : 'denied'}</span> by the cleaner.
              </p>
              <p className="notification-timestamp">
                {new Date(request.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="stats2">
        <h2>Stats</h2>
        <div className="stats-circle">
          <div className="outer-circle">
            <div className="inner-circle" style={{ transform: `rotate(${(acceptedRequests / totalRequests) * 360}deg)` }}>
              <span className="circle-number">{acceptedRequests}</span>
            </div>
          </div>
          <span className="stat-label">Accepted Requests</span>
        </div>
        <div className="stats-circle">
          <div className="outer-circle">
            <div className="inner-circle" style={{ transform: `rotate(${(deniedRequests / totalRequests) * 360}deg)` }}>
              <span className="circle-number">{deniedRequests}</span>
            </div>
          </div>
          <span className="stat-label">Denied Requests</span>
        </div>
        <div className="user-info">
        <h2>{userData.name}</h2>
        <p>Email: {userData.email}</p>
        <p>Username: {userData.username}</p>
        
      </div>
      </div>
      </div>
      <footer className="footer">
        <p>&copy; 2023 Neatly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NotificationPage;
