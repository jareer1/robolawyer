import React, { useState } from 'react';
import './StyleLegalQuery.css';
import {Link } from "react-router-dom";

const LegalQueryPage = () => {
  const [userQuery, setUserQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  

  const handleQueryChange = (event) => {
    setUserQuery(event.target.value);
    setShowAlert(false);
  };

  const handleSubmit = () => {
    if (userQuery.trim() === '') {
      setShowAlert(true);
    } else {
      console.log('User Query:', userQuery);
      setUserQuery('');
    }
  };

  return (
    <div className="LegalQueryPage">
      <h1>Legal Query Submission</h1>
      
      <textarea
        placeholder="Enter your legal query..."
        value={userQuery}
        onChange={handleQueryChange}
        rows={Math.max(3, userQuery.split('\n').length)}
      />
      
      {showAlert && (
        <div className="Alert">
          <p>Please enter your query using correct grammar.</p>
        </div>
      )}

      <button onClick={handleSubmit}>Submit</button>
      <Link to="/UserHomepage">Back to UserHomepage</Link>
    </div>
  );
};

export default LegalQueryPage;
