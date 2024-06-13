import React from "react"; 
import "./UserHomepage.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import About from "./About";
import { motion } from "framer-motion";
import Footer from "./Footer";

const UserHomepage = () => {
  const navigate = useNavigate();

  const handleLegalInquiry = () => {
    navigate("/LegalQuery");
  };

  const handleUpdateProfile = () => {
    navigate("/EditProfile");
  };

  const handleChangePassword = () => {
    navigate("/ChangePassword");
    console.log("Change Password clicked");
  };

  const handleProvideFeedback = () => {
    navigate("/GiveFeedback");
    console.log("Provide Feedback clicked");
  };

  const handleDeactivateAccount = () => {
    navigate("/DeactivateAccount");
  };

  return (
    <div className="wrapper">
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="content"
      >
        <About />
        <h2 className="features">Features of Robo Lawyer</h2>
        <div className="button-container">
          <button onClick={handleLegalInquiry}>Legal Inquiry</button>
          <button onClick={handleUpdateProfile}>Update Profile</button>
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={handleProvideFeedback}>Provide Feedback</button>
          <button onClick={handleDeactivateAccount}>Deactivate Account</button>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default UserHomepage;
