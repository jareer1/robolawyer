import React, { useState } from "react";
import "./LegalQuery.css";
import { Link } from "react-router-dom";
import { HfInference } from "@huggingface/inference";
const { Pinecone } = require("@pinecone-database/pinecone");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAEc-ruKjgE9t0kKdSNd2-Z7PWXCYCq2Bk");
const LegalQueryPage = () => {
  const [userQuery, setUserQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [query, setQuery] = useState(false);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const hf = new HfInference("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");
  const pc = new Pinecone({
    apiKey: "cb1134ce-4f02-41a6-a6a0-00a7e05e9c38",
  });

  const handleSubmit = async () => {
    if (userQuery.trim() === "") {
      setShowAlert(true);
    } else {
      try {
        console.log(userQuery);
        setQuery(userQuery);
        setSubmitted(true);
        const output = await hf.featureExtraction({
          model: "intfloat/e5-small-v2",
          inputs: userQuery,
        });

        const index = pc.index("robolawyer");

        const queryResponse = await index.query({
          vector: output,
          topK: 3,
          includeValues: false,
          includeMetadata: true,
        });
        console.log(queryResponse.matches[0].metadata.text);
        const responseData = queryResponse.matches[0].metadata.text;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt =
          "User question is: " +
          userQuery +
          ". The Pakistani constitution states: " +
          responseData +
          ". Now handle this using your own knowledge and according to pakistani constitution and explain it in a paragraph so that a normal person can understand easily";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        setResponse(text);
      } catch (error) {
        console.error("Error during feature extraction:", error);
      }
      setUserQuery("");
    }
  };

  const handleQueryChange = (event) => {
    setUserQuery(event.target.value);
    setShowAlert(false);
  };

  
  return (
    <div className="LegalQueryPage">
      <h1 className="legalheading">Legal Query Submission</h1>
      <div className="chat-container">
        {submitted && <div className="user-bubble">{query}</div>}
        {response && <div className="response-bubble">{response}</div>}
      </div>

      {showAlert && (
        <div className="Alert">
          <p>Please enter your query using correct grammar.</p>
        </div>
      )}

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter your query here"
          value={userQuery}
          onChange={handleQueryChange}
        />
        <img
          src={"./SendIcon.jpg"}
          alt="Send Icon"
          className="search-button"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LegalQueryPage;
