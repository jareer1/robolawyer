import React from 'react';
import './AdminHomepage.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
const AdminHomepage = () => {
  const navigate = useNavigate();
  const [logoutOptionsVisible, setLogoutOptionsVisible] = useState(false);
  const handleUploadLegalDocs = () => {
    navigate("/UploadDocuments")
  };

  const handleManageUsers = () => {
    navigate('/BlockUser')
  };

  const handleChangePassword = () => {
    // Implement logic for Change Password
    console.log('Change Password clicked');
    navigate('/ChangePasswordAdmin')
  };

  const handleViewFeedback = () => {
    // Implement logic for Provide Feedback
    navigate('/ViewFeedback')
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
          <h1>Admin Home</h1>
        </div>

        {/* Add your username icon here */}
        <div className="icon" onClick={handleIconClick}>
          👤
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleUploadLegalDocs}>Upload Legal Documents</button>
        <button onClick={handleManageUsers}>Manage Users</button>
        <button onClick={handleChangePassword}>Change Password</button>
        <button onClick={handleViewFeedback}>View Feedback</button>
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

export default AdminHomepage;
