import React, { useState } from 'react';
import './EditProfile.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
const ChangeEmail = () => {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [message, setMessage] = useState('');
const navigate=useNavigate()
  const handleChangeEmail = () => {
  
    const storedEmail = 'jareer@gmail.com';
    if (oldEmail !== storedEmail) {
      setMessage('Old Email is incorrect.');
      return;
    }

    if (newEmail !== confirmEmail) {
      setMessage('New Email and confirm Email do not match.');
      return;
    }

    setMessage('Email changed successfully!');
    navigate('/UserHomepage')
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Update User</h2>
        <div className="input-group">
          <label>Old Email:</label>
          <input type="Email" value={oldEmail} onChange={(e) => setOldEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>New Email:</label>
          <input type="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Confirm Email:</label>
          <input type="Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
        </div>
        <button onClick={handleChangeEmail}>Update</button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default ChangeEmail;
