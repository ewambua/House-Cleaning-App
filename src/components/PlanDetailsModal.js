import React from 'react';

const PlanDetailsModal = ({ selectedPlan, onClose }) => {
  // Define the plan details based on the selected plan
  const planDetails = {
    Bronze: {
      planName: 'Bronze Plan',
      price: 'ksh.950',
      tasks: ['Gardening', 'Laundry', 'House Cleaning'],
      description: 'Choose one task for the cleaners to do.',
    },
    Silver: {
      planName: 'Silver Plan',
      price: 'ksh.1800',
      tasks: ['Gardening', 'Laundry', 'House Cleaning'],
      description: 'Choose two tasks for the cleaners to do.',
    },
    Gold: {
      planName: 'Gold Plan',
      price: 'ksh.2500',
      tasks: ['Gardening', 'Laundry', 'House Cleaning'],
      description: 'Choose three tasks for the cleaners to do.',
    },
  };

  const { planName, price, tasks, description } = planDetails[selectedPlan];

  return (
    <div className="plan-details-modal">
      <div className="modal-content">
        <h3>{planName}</h3>
        <p>{price}</p>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
        <p>{description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PlanDetailsModal;
