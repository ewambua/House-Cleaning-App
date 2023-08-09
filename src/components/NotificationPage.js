import React from 'react';
const NotificationPage = () => {
  return (
    <div className="notification-container">
      <h1>Notification</h1>
      <div className="notification">
      <img src="https://www.example.com/accept-icon.png" alt="Accept Icon" />
        <p>Your cleaning request has been accepted by the cleaner.</p>
      </div>
    </div>
  );
};

export default NotificationPage;
