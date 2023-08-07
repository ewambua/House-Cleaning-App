import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';


const CleanerDetails = ({ cleaner }) => {
  const renderStars = (rating) => {
    // (same as before)
  };

  return (
    <div className="cleaner-details">
      <h2>{cleaner.name}</h2>
      <p>Rating: {renderStars(cleaner.rating)}</p>
      <h3>Bio</h3>
      <p>{cleaner.bio}</p>

      <h3>Reviews</h3>
      {cleaner.reviews && cleaner.reviews.length > 0 ? (
        cleaner.reviews.map((review) => (
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
