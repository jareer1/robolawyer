import React, { useState } from 'react';
import './StyleViewFeedback.css';
import { Link } from "react-router-dom";

const FeedbackPage = () => {
  // Sample feedback data
  const feedbackData = [
    { id: 1, user: 'User1', feedback: 'Great experience!' },
    { id: 2, user: 'User2', feedback: 'Very helpful service.' },
    { id: 3, user: 'User3', feedback: 'Could be improved.' },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewFeedback = (userId) => {
    // Set the selected user for viewing feedback
    setSelectedUser(userId);
  };

  const handleCloseFeedback = () => {
    // Clear the selected user when closing feedback
    setSelectedUser(null);
  };

  return (
    <div className="FeedbackPage">
      <h1>Feedback Viewer</h1>

      {/* List of users with "View" button */}
      <ul>
        {feedbackData.map((feedback) => (
          <li key={feedback.id}>
            {feedback.user} -{' '}
            <button onClick={() => handleViewFeedback(feedback.id)}>View</button>
          </li>
        ))}
      </ul>

      {/* Modal for viewing feedback */}
      {selectedUser !== null && (
        <div className="FeedbackModal">
          <div className="ModalContent">
            <h2>{feedbackData[selectedUser - 1].user}'s Feedback</h2>
            <p>{feedbackData[selectedUser - 1].feedback}</p>
            <button onClick={handleCloseFeedback}>Close</button>
          </div>
        </div>
      )}
            <Link to="/AdminHomepage">Back to AdminHomepage</Link>

    </div>
  );
};

export default FeedbackPage;
