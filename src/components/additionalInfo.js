import React, { useState, useRef } from 'react';
import './AdditionalInfo.css';

const AdditionalInfo = () => {
  const [cleaningTime, setCleaningTime] = useState('');
  const [location, setLocation] = useState('');
  const locationInputRef = useRef(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handlePlaceSelect = () => {
    const place = locationInputRef.current.getPlace();
    if (place.formatted_address) {
      setLocation(place.formatted_address);
    }
  };
  

  return (
    <div className="additional-info-page">
      <h2>Enter Additional Information</h2>
      <div className="input-container">
        <label>Cleaning Time:</label>
        <input
          type="text"
          value={cleaningTime}
          onChange={(e) => setCleaningTime(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Location:</label>
        <input
          type="text"
          ref={locationInputRef}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleLocationClick}>Use My Location</button>
      </div>
      <button className="submit-button">Submit</button>

      
    </div>
  );
};

export default AdditionalInfo;
