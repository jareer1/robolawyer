// DocumentUpdater.js

import React, { useState } from 'react';
import './StyleUploadDocument.css';
import { Link } from "react-router-dom";

const DocumentUpdater = () => {
  const [document, setDocument] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDocument(file);
  };

  const handleSave = () => {
    console.log('Document saved:', document);
    setDocument(null);
  };

  return (
    <div className="document-updater-container">
      <h1>Update Document</h1>
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button onClick={handleSave} disabled={!document} className="save-button">
        Save Document
      </button>
    <Link to="/AdminHomePage">Back To AdminHomepage</Link>
    </div>
  );
};

export default DocumentUpdater;
