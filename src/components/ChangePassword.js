import React, { useState } from 'react';
import './ChangePassword.css'; // Import the CSS file for styling
import { useNavigate} from "react-router-dom";
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";

const ChangePassword = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = () => {
    const storedEmail = localStorage.getItem('person_email');
    console.log(storedEmail,oldPassword)
    const credential = EmailAuthProvider.credential(storedEmail, oldPassword);
  
    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (newPassword !== confirmPassword) {
          setMessage('New password and confirm password do not match.');
          return;
        }

        updatePassword(user, newPassword)
          .then(() => {
            setMessage('Password changed successfully!');
            navigate('/UserHomepage');
            console.log("Password updated successfully");
          })
          .catch((error) => {
            console.log(error);
            setMessage('Error updating password. Please try again.');
          });
      })
      .catch((error) => {
        console.log(error);
        setMessage('Old password is incorrect.');
      });
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Update Password</h2>
        <div className="input-group">
          <label>Old Password:</label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button onClick={handleChangePassword}>Update</button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};


export default ChangePassword;
