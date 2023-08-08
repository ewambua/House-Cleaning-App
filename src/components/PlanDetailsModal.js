import React, { useState, useEffect } from 'react';
import './PlanDetailsModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import CleanerDetails from './CleanerDetails';
import { faCheckSquare, faSquare, faTshirt, faHome, faTree } from '@fortawesome/free-solid-svg-icons';

const PlanDetailsModal = ({ selectedPlan, onClose }) => {
  const [selectedCleaner, setSelectedCleaner] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [availableCleaners, setAvailableCleaners] = useState([]);


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

  useEffect(() => {
    fetch('/cleaners') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAvailableCleaners(data); // Assuming your API response contains a list of cleaner objects.
      })
      .catch(error => {
        console.error('Error fetching cleaners:', error);
      });
  }, []);
  


  const handleCleanerSelect = (cleaner) => {
    setSelectedCleaner(cleaner === selectedCleaner ? null : cleaner);
  };

  const handleSubmit = () => {
    // Do something with the user's selections (selectedPlan, selectedCleaner, selectedTasks)
    // For example, you can send this data to an API or perform any other necessary actions.
    console.log('Selected Plan:', selectedPlan);
    console.log('Selected Cleaner:', selectedCleaner);
    console.log('Selected Tasks:', selectedTasks);

    // Close the modal
    onClose();
  };


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



  const handleTaskSelect = (task) => {
    if (selectedTasks.includes(task)) {
      setSelectedTasks((prevSelectedTasks) => prevSelectedTasks.filter((t) => t !== task));
    } else if (selectedTasks.length < maxTasksSelectable) {
      setSelectedTasks((prevSelectedTasks) => [...prevSelectedTasks, task]);
    }
  };

  return (
    <div className="plan-details-modal">
      <div className="modal-contento">
      <FontAwesomeIcon icon={faTimes} className="close-button" onClick={onClose} />
        <h2>{planName}</h2>

        <div className="details-modal">
        <div className="tasks-sectiono">
          <h3 className='task-head'>Select {maxTasksSelectable} Task{maxTasksSelectable > 1 && 's'}:</h3>
          <ul className='tasks'>
  {tasks.map((task, index) => (
    <li key={index}>
      <label>
        <input
          type="checkbox"
          checked={selectedTasks.includes(task)}
          onChange={() => handleTaskSelect(task)}
          disabled={selectedTasks.length >= maxTasksSelectable && !selectedTasks.includes(task)}
        />
        {task === 'Laundry' && <FontAwesomeIcon icon={faTshirt} className="task-icon" />}
        {task === 'House Cleaning' && <FontAwesomeIcon icon={faHome} className="task-icon" />}
        {task === 'Gardening' && <FontAwesomeIcon icon={faTree} className="task-icon" />}
        {task}
      </label>
    </li>
  ))}
</ul>



        </div>
        <p className="description"> <br /> For this plan you are only allowed to choose {maxTasksSelectable} Task{maxTasksSelectable > 1 && 's'} for the cleaners to do. The tasks are not limited to one choice but you can select any variations .  </p>
        <h3>Available Cleaners:</h3>
        <div className="cleaners-section">

          <ul>
            {availableCleaners.map((cleaner, index) => (
              <li
                key={index}
                className={`cleaner-item ${selectedCleaner === cleaner ? 'selected' : ''}`}
                onClick={() => handleCleanerSelect(cleaner)}
              >
                <div className="cleaner-name">{cleaner.name}</div>
                <div className="cleaner-rating">
                  {renderStars(cleaner.rating)}
                </div>
              </li>
            ))}
          </ul>
        </div>
        </div>

        {selectedCleaner && <CleanerDetails cleaner={selectedCleaner} />}

         {/* Submit Button */}
         <button className="submit-button" onClick={handleSubmit}>
          Choose Cleaner
        </button>


      </div>
    </div>
  );
};

export default PlanDetailsModal;
