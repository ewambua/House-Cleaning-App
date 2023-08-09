// NotificationPage.jsx
import React from 'react';
import './NotificationPage.css';
const NotificationPage = () => {
  return (
    <div className="notification-container">
      <h1>Notification</h1>
      <div className="notification">
        <img src="accept-icon.png" alt="Accept Icon" />
        <p>Your cleaning request has been accepted by the cleaner.</p>
      </div>
    </div>
  );
};

export default NotificationPage;
