import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = () => {
    // Mock user profile data
    const mockUserProfileMary = {
      name: 'Mary Mburu',
      email: 'mary.mburu@example.com',
      age: 30,
      address: '123 Main Street, City, Country',
      bio: 'I love cleaning and keeping things tidy!',
      rating: 4.7,
    };

    setUserProfile(mockUserProfileMary);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="user-profile">
      {userProfile ? (
        <>
          <div className="profile-details">
            <h2>{userProfile.name}</h2>
            <p>Email: {userProfile.email}</p>
            <p>Age: {userProfile.age}</p>
            <p>Address: {userProfile.address}</p>
            <p>Bio: {userProfile.bio}</p>
            <p>Rating: {userProfile.rating}</p>
          </div>
          <div className="profile-image-container">
            <img
              src="/vn_passport.jpg"
              alt="Passport"
              className="profile-image"
            />
          </div>
          <div className="welcome-message">
            <h2>Hi, Mary Mburu!</h2>
            <p>Welcome to Home Cleaning App</p>
          </div>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
