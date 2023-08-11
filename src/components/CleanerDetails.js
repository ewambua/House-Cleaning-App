import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './CleanerDetails.css'; 

const CleanerDetails = ({ cleaner, onBack }) => {
  const [cleanerDetails, setCleanerDetails] = useState({
    reviews: [],
  });
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [userMap, setUserMap] = useState({});

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating * 2) / 2;
    const starIcons = Array.from({ length: totalStars }, (_, index) => {
      if (index + 1 <= filledStars) {
        return <FontAwesomeIcon key={index} icon={faStar} className="star filled-star" />;
      } else if (index + 0.5 <= filledStars) {
        return <FontAwesomeIcon key={index} icon={faStarHalfAlt} className="star half-star" />;
      } else {
        return <FontAwesomeIcon key={index} icon={faStar} className="star empty-star" />;
      }
    });
    return starIcons;
  };

  useEffect(() => {
    fetch(`https://neatly-api.onrender.com/cleaners/${cleaner.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCleanerDetails(data);
        const tempUserMap = {};

        const userPromises = data.reviews.map((review) =>
          fetch(`https://neatly-api.onrender.com/users/${review.user_id}`)
            .then((response) => response.json())
            .then((userData) => {
              tempUserMap[review.user_id] = userData.name || "";
            })
        );

        Promise.all(userPromises).then(() => {
          setUserMap(tempUserMap);
        });
      })
      .catch(error => {
        console.error('Error fetching cleaner details:', error);
      });
  }, [cleaner.id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const newReview = {
      review: reviewText,
      rating: reviewRating,
      user_id: userId,
    };

    fetch(`https://neatly-api.onrender.com/cleaners/${cleaner.id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit review');
        }
        return response.json();
      })
      .then(data => {
        setCleanerDetails(prevDetails => ({
          ...prevDetails,
          reviews: [...prevDetails.reviews, data],
        }));
        setReviewText('');
        setReviewRating(0);

      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
  };
  
  return (
    <div className="cleaner-details-container">
      <div className="cleaner-info">
        <div className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} onClick={onBack} className="back-icon" />
        </div>
        <h2>{cleaner.name}</h2>
        <div className="cleaner-image">
          <img classname="details-dp" src={cleaner.image_url} alt={cleaner.name} />
        </div>
        <div className="rating">{renderStars(cleaner.rating)}</div>
        <p>{cleanerDetails.description}</p>
        <form onSubmit={handleSubmitReview}>
          <h3>Submit a Review</h3>
          <div className="rating-label">Add Rating:</div> {/* Added label */}
          <div className="stars">
            {Array.from(Array(5)).map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={index + 1 <= reviewRating ? faStar : faStarHalfAlt}
                className="star rating-star"
                onClick={() => setReviewRating(index + 1)}
              />
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
      <div className="reviews2">
        <h3>Reviews</h3>
        {cleanerDetails.reviews && cleanerDetails.reviews.length > 0 ? (
          cleanerDetails.reviews.map((review) => (
            <div key={review.id} className="review2">
              <div className="stars">
                {renderStars(review.rating)}
              </div>
              
              <p>{review.review}</p>
              <p>By: {userMap[review.user_id]}</p>
            </div>
          ))
        ) : (
          <p>No reviews available for this cleaner.</p>
        )}
      </div>
    </div>
  );
};

export default CleanerDetails;
