import React, { useState } from 'react';
import './DashboardCleaner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const CleanerDashboard = () => {
  const [cleanerProfile] = useState({
    name: 'John Doe',
    bio: 'I am an experienced cleaner with 5 years of experience.',
    rating: 4.7,
    notifications: [
      {
        id: 1,
        sender: 'Alice',
        jobTitle: 'Laundry',
        response: 'accept',
      },
      {
        id: 2,
        sender: 'Bob',
        jobTitle: 'Bathroom Cleaning',
        response: 'decline',
      },
    ],
    reviews: [
      { id: 1, review: 'Great service, highly recommended!', rating: 5 },
      { id: 2, review: 'Good job!', rating: 4 },
      {
        id: 3,
        review:
          'John is an amazing cleaner. He did a thorough job cleaning my house, and I am very satisfied with the results. He was punctual, professional, and paid attention to every detail. I will definitely hire him again for future cleaning services!',
        rating: 5,
      },
      {
        id: 4,
        review:
          'I had a wonderful experience with John. He arrived on time and worked diligently to clean my apartment. He is friendly, courteous, and takes pride in his work. My place looks spotless! I highly recommend John for anyone looking for top-notch cleaning services.',
        rating: 5,
      },
      {
        id: 5,
        review:
          'John exceeded my expectations with his cleaning service. He is thorough, reliable, and has a keen eye for detail. My home has never looked better! I highly recommend John to anyone in need of a professional cleaner.',
        rating: 5,
      },
    ],
  });

  return (
    <div className="cleaner-dashboard">
      <div className="dashboard-section cleaner-profile">
        <div className="profile-image-container">
          <img src='' alt="profile" className="profile-image" />
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