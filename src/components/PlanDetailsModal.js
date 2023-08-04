import React, { useState } from 'react';
import './PlanDetailsModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import CleanerDetails from './CleanerDetails';

const PlanDetailsModal = ({ selectedPlan, onClose }) => {
  // Define the plan details based on the selected plan
  const planDetails = {
    Bronze: {
      planName: 'Bronze Plan',
      price: 'ksh.950',
      tasks: ['Gardening', 'Laundry', 'House Cleaning'],
      description: 'Choose one task for the cleaners to do.',
      maxTasksSelectable: 1,
    },
    Silver: {
      planName: 'Silver Plan',
      price: 'ksh.1800',
      tasks: ['Gardening', 'Laundry', 'House Cleaning'],
      description: 'Choose two tasks for the cleaners to do.',
      maxTasksSelectable: 2,
    },
    Gold: {
      planName: 'Gold Plan',
      price: 'ksh.2500',
      tasks: ['Gardening', 'Laundry', 'House Cleaning'],
      description: 'Choose three tasks for the cleaners to do.',
      maxTasksSelectable: 3,
    },
  };

  const { planName, price, tasks, description, maxTasksSelectable } = planDetails[selectedPlan];

  // Available cleaners with ratings
  const availableCleaners = [
    { name: 'Cleaner 1', rating: 4.5 },
    { name: 'Cleaner 2', rating: 4.0 },
    { name: 'Cleaner 3', rating: 4.8 },
    { name: 'Cleaner 4', rating: 4.2 },
    { name: 'Cleaner 5', rating: 4.7 },
    { name: 'Cleaner 6', rating: 4.9 },
    { name: 'Cleaner 7', rating: 4.6 },
    { name: 'Cleaner 8', rating: 4.3 },
    { name: 'Cleaner 9', rating: 4.4 },
  ];

  const [selectedCleaner, setSelectedCleaner] = useState(null);
// Function to handle the click event when a cleaner is selected
const handleCleanerSelect = (cleaner) => {
  setSelectedCleaner(cleaner);
};

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating * 2) / 2;
    const starIcons = [];
  
    for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
        starIcons.push(<i key={i} className="fa fa-star filled-star" />);
      } else if (i - 0.5 === filledStars) {
        starIcons.push(<i key={i} className="fa fa-star-half-o half-star" />);
      } else {
        starIcons.push(<i key={i} className="fa fa-star-o empty-star" />);
      }
    }
  
    return starIcons;
  };

  // State to track the selected tasks
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Function to handle task selection
  const handleTaskSelect = (task) => {
    if (selectedTasks.includes(task)) {
      // If the task is already selected, remove it from the selectedTasks
      setSelectedTasks((prevSelectedTasks) => prevSelectedTasks.filter((t) => t !== task));
    } else if (selectedTasks.length < maxTasksSelectable) {
      // If the maximum tasks selectable has not been reached, add the task to selectedTasks
      setSelectedTasks((prevSelectedTasks) => [...prevSelectedTasks, task]);
    }
  };

  return (
    <div className="plan-details-modal">
      <div className="modal-content">
        <h3>{planName}</h3>
        <p>{price}</p>
        <form>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task)}
                    onChange={() => handleTaskSelect(task)}
                    disabled={
                      selectedTasks.length >= maxTasksSelectable && !selectedTasks.includes(task)
                    }
                  />
                  {task}
                </label>
              </li>
            ))}
          </ul>
        </form>
        <p>{description}</p>

       {/* Section to display available cleaners and their ratings */}
       <div className="cleaners-section">
  <h4>Available Cleaners:</h4>
  <ul>
    {availableCleaners.map((cleaner, index) => (
      <li key={index} onClick={() => handleCleanerSelect(cleaner)}>
      {cleaner.name} - Rating: {renderStars(cleaner.rating)}
    </li>
    ))}
  </ul>
</div>

 {/* Show the CleanerDetails component when a cleaner is selected */}
 {selectedCleaner && <CleanerDetails cleaner={selectedCleaner} />}
    


        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PlanDetailsModal;