import React, { useState, useEffect } from 'react';
import './GiveFeedback.css';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set,push } from "firebase/database";

const GiveFeedback = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const db = getDatabase();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSuggestionsChange = (event) => {
    setSuggestions(event.target.value);
  };

  const storedUsername = localStorage.getItem('Username');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const feedRef = ref(db, 'feedback/'+ storedUsername)
    const newPostRef = push(feedRef);
      set(newPostRef, {
        Username: storedUsername,
        Option: selectedOption,
        Suggestions: suggestions,
        },
        { merge: false })
        .then(() => {
          localStorage.setItem('Username', storedUsername)
          localStorage.setItem('Option', selectedOption)
          localStorage.setItem('Suggestions', suggestions)
          alert("Feedback Saved Successfully!");
          navigate("/Userhomepage");
        });
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