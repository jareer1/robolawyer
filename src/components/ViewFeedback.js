import React, { useState, useEffect } from "react";
import './StyleViewFeedback.css';
import { useNavigate, Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

const ViewFeedback = () => {
  const navigate = useNavigate();
  const [usersWithFeedback, setUsersWithFeedback] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
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
    setFeedbackData([]);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);

    // Retrieve feedback data for the selected user
    const userFeedbackRef = ref(db, `feedback/${user}`);
    onValue(userFeedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedbackArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setFeedbackData(feedbackArray);
      } else {
        setFeedbackData([]);
      }
    });
  };

  return (
    <div className="FeedbackPage">
      <h1>Feedback Viewer</h1>
      <table className="feedback-table">
        <thead>
          <tr>
            <th className="username-column">Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersWithFeedback.map((user) => (
            <tr key={user}>
              <td><h2>{user}'s Feedback</h2></td>
              <td><button onClick={() => handleUserClick(user)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Modal for viewing feedback */}
      {selectedUser !== null && (
        <div className="FeedbackModal">
          <div className="ModalContent">
            <h3 className="feedbackmodalname">{selectedUser}'s Feedback</h3>
            {feedbackData.map((feedback, index) => (
              <div key={index}>
                <p><strong>Feedback {index + 1}:</strong></p>
                <p>Rating: {feedback.Option}</p>
                <p>Suggestions: {feedback.Suggestions}</p>
                {index !== feedbackData.length - 1 && <hr />} {/* Add a horizontal line between feedbacks */}
              </div>
            ))}
            <button onClick={handleCloseFeedback}>Close</button>
          </div>
        </div>
      )}
      <Link to="/AdminHomepage">Back to Admin Homepage</Link>
    </div>
  );
};

export default ViewFeedback;
