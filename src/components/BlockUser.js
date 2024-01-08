import React, { useState } from 'react';
import './BlockUser.css'; // Import the CSS file for styling
import { Link } from "react-router-dom";

const BlockUser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John', email: 'john@example.com', isBlocked: false },
    { id: 2, name: 'Doe', email: '123@example.com', isBlocked: false },
    { id: 3, name: 'Ali', email: 'alihusnain@example.com', isBlocked: false },
    { id: 4, name: 'Ahmed', email: 'ahmedhussain@example.com', isBlocked: false },
    { id: 5, name: 'Bilal', email: 'bilal@example.com', isBlocked: false },
    { id: 6, name: 'Mustafa', email: '@example.com', isBlocked: false },
  ]);

  const handleToggleBlock = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  return (
    <div className="block-user-container">
      <h2>Block User</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button
              className={`block-button ${user.isBlocked ? 'blocked' : ''}`}
              onClick={() => handleToggleBlock(user.id)}
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