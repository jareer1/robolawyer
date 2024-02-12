import React, { useState, useEffect } from "react";
import './BlockUser.css'; // Import the CSS file for styling
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue, remove,set } from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";

const BlockUser = () => {
  const auth = getAuth();
  const [users, setUsers] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const usersDataArray = Object.keys(userData).map(userId => ({
          id: userId,
          ...userData[userId] // Spread the user data for this ID
        }));
        setUsers(usersDataArray);
      }
    });
  }, [db]);

  const handleToggleBlock = (userId, isBlocked) => {
    if (!isBlocked) {
      console.log(userId);
      // Delete user from Firebase Authentication
      deleteUser(auth.currentUser)
        .then(() => console.log("User deleted from Firebase Authentication"))
        .catch((error) =>
          console.error("Error deleting user from Firebase Authentication:", error)
        );
  
      const userRef = ref(db, `users/${userId}`);
      set(ref(db, `users/${userId}/isBlocked`), true)
        .then(() => {
          console.log("User blocked in Realtime Database");
          // Fetch the updated list of users
          const updatedUsersRef = ref(db, "users");
          onValue(updatedUsersRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
              const usersDataArray = Object.keys(userData).map((userId) => ({
                id: userId,
                ...userData[userId],
              }));
              setUsers(usersDataArray);
            }
          });
        })
        .catch((error) =>
          console.error("Error updating user's blocked status:", error)
        );
    }
  };
  

  return (
    <div className="block-user-container">
      <h2>Block User</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <span className="user-name">{user.Username}</span>
              <span className="user-email">{user.person_email}</span>
            </div>
            <button
              className={`block-button ${user.isBlocked ? 'blocked' : ''}`}
              onClick={() => handleToggleBlock(user.id, user.isBlocked)}
            >
              {user.isBlocked ? 'Unblock' : 'Block'}
            </button>
          </li>
        ))}
      </ul>
      <Link to="/AdminHomepage">Back to AdminHomepage</Link>
    </div>
  );
};

export default BlockUser;
