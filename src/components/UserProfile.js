import React, { useState, useEffect } from 'react';
import './UserProfile.css'


const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const storedUserId = localStorage.getItem('userId');

      const response = await fetch(`/users/${storedUserId}`, {
        method: 'GET',
      });

      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData);
        console.log('User Profile Data:', userData);
      } else {
        console.log('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error occurred while fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="overlay">
    <div className="user-profile-modal">
      {userProfile ? (
        <>
          <div className="profile-details">
            <h2>Welcome <span className='h2o'>{userProfile.name}</span>!</h2>
            Email:<div className='email'><p> {userProfile.email}</p></div>
            {/* Display other user profile data as needed */}
          </div>
          <div className="profile-image-container">
            {/* Display user profile image */}
            <img src="https://cdn.vectorstock.com/i/preview-1x/89/50/generic-person-gray-photo-placeholder-man-vector-24848950.jpg" alt="Passport" className="profile-image" />
          </div>
          {/* Add additional profile information and styling here */}
          
        </>
        
      ) : (
        <p>Loading user profile...</p>
        
      )}
    </div>
    </div>
  );
};

export default UserProfile;
