import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
const DeactivateAccountPage = () => {
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const navigate = useNavigate()
    const handleDeactivateAccount = () => {
        setConfirmationVisible(true);
    };

    const handleConfirmation = (confirmed) => {
        if (confirmed) {

            navigate('/')
        }
        setConfirmationVisible(false);
    };

    return (
        <div className="deactivate-account-page">
            <h1>Deactivate Account Page</h1>
            <button onClick={handleDeactivateAccount}>Deactivate Account</button>

            {confirmationVisible && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to deactivate your account?</p>
                    <button onClick={() => handleConfirmation(true)}>Yes</button>
                    <button onClick={() => handleConfirmation(false)}>No</button>
                </div>
            )}
        </div>
    );
};

export default DeactivateAccountPage;