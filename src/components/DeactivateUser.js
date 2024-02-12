import React, { useState } from 'react';
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const DeleteUser = () => {
    
  const navigate = useNavigate()
  const auth = getAuth();
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [error, setError] = useState(null);

  const handleDeactivateAccount = () => {
    const user = auth.currentUser;

    if (user) {
      user
        .delete()
        .then(() => {
          // User account successfully deleted
          setIsDeactivated(true);
        })
        .catch((error) => {
          // An error occurred
          setError(error.message);
        });
    } else {
      setError("No user is currently signed in.");
    }
    alert("Account Deactivated!")
    navigate("/Login");
  };

  return (
    <div>
      <h2>Account Deactivation</h2>
      <p>Are you sure you want to deactivate your account?</p>
        <>
          <button onClick={handleDeactivateAccount}>Deactivate Account</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    </div>
  );
};

export default DeleteUser;
