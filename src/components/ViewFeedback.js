import React, { useState, useEffect } from "react";
import './StyleViewFeedback.css';
import { useNavigate, Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

const ViewFeedback = () => {
  const navigate = useNavigate();
  const [usersWithFeedback, setUsersWithFeedback] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedbackData, setFeedbackData] = useState({});
  const db = getDatabase();

  // Fetch the list of users who have given feedback
  useEffect(() => {
    const feedbackRef = ref(db, "feedback");
    onValue(feedbackRef, (snapshot) => {
      const feedbackData = snapshot.val();
      if (feedbackData) {
        const users = Object.keys(feedbackData);
        setUsersWithFeedback(users);
      }
    });
  }, [db]);

  const handleCloseFeedback = () => {
    setSelectedUser(null);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);

    // Retrieve feedback data for the selected user
    const userFeedbackRef = ref(db, `feedback/${user}`);
    onValue(userFeedbackRef, (snapshot) => {
      const data = snapshot.val();
      setFeedbackData(data || {});
    });
  };

  return (
    <div className="FeedbackPage">
      <h1>Feedback Viewer</h1>
      <div className="user-list">
        <ul>
          {usersWithFeedback.map((user) => (
            <li key={user}>
              <div className="user-row">
                <h3>{user}</h3>
                <button onClick={() => handleUserClick(user)}>View</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for viewing feedback */}
      {selectedUser !== null && (
        <div className="FeedbackModal">
          <div className="ModalContent">
            <h3>{selectedUser}'s Feedback</h3>
            <p>Rating: {feedbackData.Option}</p>
            <p>Suggestions: {feedbackData.Suggestions}</p>
            <button onClick={handleCloseFeedback}>Close</button>
          </div>
        </div>
      )}
      <Link to="/AdminHomepage">Back to Admin Homepage</Link>
    </div>
  );
};

export default ViewFeedback;