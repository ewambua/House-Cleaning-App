import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';


const CleanerDetails = ({ cleaner }) => {
  const [cleanerDetails, setCleanerDetails] = useState({
    reviews: [], // Initialize reviews as an empty array
  });
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating * 2) / 2;
    const starIcons = Array.from({ length: totalStars }, (_, index) => {
      if (index + 0.5 <= filledStars) {
        return <FontAwesomeIcon key={index} icon={faStar} className="star filled-star" />;
      } else if (index < filledStars) {
        return <FontAwesomeIcon key={index} icon={faStarHalfAlt} className="star half-star" />;
      } else {
        return <FontAwesomeIcon key={index} icon={faStar} className="star empty-star" />;
      }
    });
    return starIcons;
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
        console.log(data); // Assuming your API response contains additional cleaner details.
      })
      .catch(error => {
        console.error('Error fetching cleaner details:', error);
      });
  }, [cleaner.id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
  
    // Retrieve user ID from local storage
    const userId = localStorage.getItem('userId');
  
    // Create a new review object
    const newReview = {
      review: reviewText,
      rating: reviewRating,
      user_id: userId, // Include the user ID
    };
  
    // Submit the new review to the API
    fetch(`/cleaners/${cleaner.id}/reviews`, {
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
        // Update the cleaner details with the new review
        setCleanerDetails(prevDetails => ({
          ...prevDetails,
          reviews: [...prevDetails.reviews, data],
        }));
        // Clear the review form
        setReviewText('');
        setReviewRating(0);
      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
  };
  
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
              {/* ... (same as before) */}
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available for this cleaner.</p>
      )}

      {/* Review submission form */}
      <form onSubmit={handleSubmitReview}>
        <h3>Submit a Review</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          required
        />
        <div className="stars">
          {/* Allow user to select rating */}
          {Array.from(Array(5)).map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={index + 1 <= reviewRating ? faStar : faStarHalfAlt}
              className="star rating-star"
              onClick={() => setReviewRating(index + 1)}
            />
          ))}
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default CleanerDetails;