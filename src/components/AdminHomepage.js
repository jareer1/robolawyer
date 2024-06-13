import React from 'react';
import './AdminHomepage.css';
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from './Navbar';
import { motion } from "framer-motion";

const AdminHomepage = () => {
  const navigate = useNavigate();
  
  const handleUploadLegalDocs = () => {
    navigate("/UploadDocuments")
  };

  const handleManageUsers = () => {
    navigate('/BlockUser')
  };

  const handleChangePassword = () => {
    console.log('Change Password clicked');
    navigate('/ChangePasswordAdmin')
  };

  const handleViewFeedback = () => {
    navigate('/ViewFeedback')
  };

  return (
    <div>
      <NavBar/>
      <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="button-container">
        <button onClick={handleUploadLegalDocs}>Upload Legal Documents</button>
        <button onClick={handleManageUsers}>Manage Users</button>
        <button onClick={handleChangePassword}>Change Password</button>
        <button onClick={handleViewFeedback}>View Feedback</button>
      </div>
      </motion.div>
    </div>
  );
};

export default AdminHomepage;
