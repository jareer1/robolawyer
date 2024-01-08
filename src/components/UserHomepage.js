import React, { useState } from 'react';
import './UserHomepage.css';
import { useNavigate } from 'react-router-dom';

const UserHomepage = () => {
  const navigate = useNavigate();
  const [logoutOptionsVisible, setLogoutOptionsVisible] = useState(false);

  const handleLegalInquiry = () => {
    navigate('/LegalQuery');
  };

  const handleUpdateProfile = () => {
    navigate('/EditProfile');
  };

  const handleChangePassword = () => {
    navigate('/ChangePassword');
    console.log('Change Password clicked');
  };

  const handleProvideFeedback = () => {
    navigate('/GiveFeedback');
    console.log('Provide Feedback clicked');
  };

  const handleDeactivateAccount = () => {
    navigate('/DeactivateAccount');
  };

  const handleIconClick = () => {
    setLogoutOptionsVisible(!logoutOptionsVisible);
  };

  const handleLogout = () => {
    navigate('/Login');
  };

  return (
    <div>
      <div className="header">
        <div className="user-info">
          <h1>User Home</h1>
        </div>
        {/* Add your username icon here */}
        <div className="icon" onClick={handleIconClick}>
          👤
        </div>
      </div>

      <div className="button-container">
        <button onClick={handleLegalInquiry}>Legal Inquiry</button>
        <button onClick={handleUpdateProfile}>Update Profile</button>
        <button onClick={handleChangePassword}>Change Password</button>
        <button onClick={handleProvideFeedback}>Provide Feedback</button>
        <button onClick={handleDeactivateAccount}>Deactivate Account</button>
      </div>
      {logoutOptionsVisible && (
        <div className="logout-options">
          <p>Are you sure you want to logout?</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleIconClick}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserHomepage;
