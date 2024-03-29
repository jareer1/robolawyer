import React, { useState } from 'react';
import './StyleLegalQuery.css';
import { Link } from "react-router-dom";
import { HfInference } from "@huggingface/inference";
const { Pinecone } = require('@pinecone-database/pinecone');

const LegalQueryPage = () => {
  const [userQuery, setUserQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [response, setResponse] = useState('');

  const hf = new HfInference(process.env.HF_TOKEN);
  const pc = new Pinecone({
    apiKey: 'cb1134ce-4f02-41a6-a6a0-00a7e05e9c38'
  });

  const handleSubmit = async () => {
    if (userQuery.trim() === '') {
      setShowAlert(true);
    } else {
      try {
        const output = await hf.featureExtraction({
          model: "intfloat/e5-small-v2",
          inputs: userQuery,
        });

        const index = pc.index('robolawyer');

        const queryResponse = await index.query({
          vector: output,
          topK: 3,
          includeValues: false,
          includeMetadata: true,
        });

        const responseData = queryResponse.matches[0].metadata;
        setResponse(responseData);
      } catch (error) {
        console.error("Error during feature extraction:", error);
      }

      setUserQuery('');
    }
  };

  const handleQueryChange = (event) => {
    setUserQuery(event.target.value);
    setShowAlert(false);
  };

  return (
    <div className="LegalQueryPage">
      <h1 className="legalheading">Legal Query Submission</h1>
      
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
      <div className="LinkWrapper">
        <Link to="/UserHomepage">Back to UserHomepage</Link>
      </div>
  
      {response && (
        <div className="ResponseArea">
          <h2>Response:</h2>
          <p>{response.input}</p>
        </div>
      )}
    </div>
  );
};

export default LegalQueryPage;
