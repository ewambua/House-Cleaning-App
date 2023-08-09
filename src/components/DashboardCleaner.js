import React, { useState, useEffect } from 'react';
import './DashboardCleaner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const CleanerDashboard = () => {
  const [cleanerProfile, setCleanerProfile] = useState({
    name: '',
    bio: '',
    rating: 0,
    notifications: [],
    reviews: [],
  });

  const [userMap, setUserMap] = useState({}); // Store user data here

  useEffect(() => {
    const cleanerId = localStorage.getItem('cleanerid');

    if (cleanerId) {
      fetch(`/cleaners/${cleanerId}`)
        .then(response => response.json())
        .then(data => {
          setCleanerProfile({
            name: data.name || '',
            bio: data.bio || '',
            rating: data.rating || 0,
            notifications: data.notifications || [],
            reviews: data.reviews || [],
          });

          const tempUserMap = {};

          // Fetch user data for each user ID in the reviews
          const promises = data.reviews.map(review =>
            fetch(`/users/${review.user_id}`)
              .then(response => response.json())
              .then(userData => {
                tempUserMap[review.user_id] = userData.name || ''; // Assuming user data has a 'name' field
              })
          );

          // Wait for all user data requests to complete before updating the state
          Promise.all(promises).then(() => {
            setUserMap(tempUserMap);
            console.log('User Map:', tempUserMap);
          });

          console.log('Fetched Cleaner Data:', data);
        })
        .catch(error => {
          console.error('Error fetching cleaner data:', error);
        });
    }
  }, []);
  return (
    <div className="cleaner-dashboard">
      <div className="dashboard-section cleaner-profile">
        <div className="profile-image-container">
          <img src='{cleanerProfile.image_url}' alt="profile" className="profile-image" />
        </div>
        <div className="user-info">
          <h2>{cleanerProfile.name}</h2>
          <p>{cleanerProfile.bio}</p>
        </div>
      </div>
    <div className='boxes'>
      <div className="dashboard-section notifications">
        <h3>Notifications</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Job Description</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {cleanerProfile.notifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.sender}</td>
                <td>{notification.jobTitle}</td>
                <td className={notification.response}>
                  {notification.response === 'accept' ? 'Accept' : 'Decline'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section reviews">
      <h3>Reviews</h3>
          {cleanerProfile.reviews.map((review) => (
            <div key={review.id} className="review">
              <p>{review.review}</p>
              <p>Posted by: {userMap[review.user_id]}</p>
              <div className="stars">
              {Array.from(Array(Math.floor(review.rating))).map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star full-star" />
              ))}
              {review.rating % 1 !== 0 && (
                <FontAwesomeIcon icon={faStar} className="star half-star" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CleanerDashboard;