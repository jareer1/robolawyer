import React, { useState } from 'react';
import './GiveFeedback.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
const GiveFeedback = () => {
  const navigate=useNavigate()
  const [selectedOption, setSelectedOption] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSuggestionsChange = (event) => {
    setSuggestions(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Selected Option:', selectedOption);
    console.log('Suggestions:', suggestions);
    navigate('/UserHomepage')
  };

  return (
    <div className="feedback-container">
      <h2>Feedback Form</h2>
      <div className="options-container">
        {[1, 2, 3, 4, 5].map((option) => (
          <label key={option} className="radio-label">
            <input
              type="radio"
              name="feedbackOption"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <div className="suggestions-container">
        <label>Suggestions:</label>
        <textarea
          rows="4"
          value={suggestions}
          onChange={handleSuggestionsChange}
          placeholder="Write your suggestions here..."
        />
      </div>
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default GiveFeedback;
