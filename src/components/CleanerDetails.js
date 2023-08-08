import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';


const CleanerDetails = ({ cleaner }) => {
  const [cleanerDetails, setCleanerDetails] = useState(null);

  const renderStars = (rating) => {
    // (same as before)
  };

  useEffect(() => {
    // Fetch additional details for the selected cleaner
    fetch(`/cleaners/${cleaner.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCleanerDetails(data); 
        console. log(data)// Assuming your API response contains additional cleaner details.
      })
      .catch(error => {
        console.error('Error fetching cleaner details:', error);
      });
  }, [cleaner.id]);

  return (
    <div className="cleaner-details">
      <h2>{cleaner.name}</h2>
      <p>Rating: {renderStars(cleaner.rating)}</p>
      
      {/* Display cleaner bio */}
      {cleanerDetails && (
        <>
          <h3>Bio</h3>
          <p>{cleanerDetails.bio}</p>
        </>
      )}

      {/* Display cleaner reviews */}
      {cleanerDetails && cleanerDetails.reviews && cleanerDetails.reviews.length > 0 ? (
        cleanerDetails.reviews.map((review) => (
          <div key={review.id} className="review">
            <p>{review.review}</p>
            <div className="stars">
              {Array.from(Array(Math.floor(review.rating))).map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star full-star" />
              ))}
              {review.rating % 1 !== 0 && <FontAwesomeIcon icon={faStar} className="star half-star" />}
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available for this cleaner.</p>
      )}
    </div>
  );
};

export default CleanerDetails;
