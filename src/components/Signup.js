import React, { useState } from "react";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const db = getDatabase();

  const handleLogin = async (e) => {
    console.log(`Signing up as ${role} with the following details:`);
    console.log(`Username: ${username}`);
    e.preventDefault();
    if (username == "") {
      setMessage("username cannot be null");
      return;
    }
    if (password == "") {
      setMessage("password cannot be null");
      return;
    }
    if (email == "") {
      setMessage("email cannot be null");
      return;
    }
    if (address == "") {
      setMessage("address cannot be null");
      return;
    }
    if (occupation == "") {
      setMessage("occupation cannot be null");
      return;
    }
    if (password.length < 6) {
      setMessage("password cannot be less than 6");
      return;
    }
    console.log("jareer here");
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Successful Signed up
        const user = userCredential.user;
        console.log("hi");
        set(ref(db, "users/" + user.uid), {
          Username: username,
          Occupation: occupation,
          Address: address,
          person_email: email,
        }).then(() => {
          localStorage.setItem("Username", username);
          localStorage.setItem("Occupation", occupation);
          localStorage.setItem("address", address);
          localStorage.setItem("person_email", email);
          alert("Sign Up Successfully!");
          navigate("/Login");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        alert("Failed to Sign Up!!.Email already exists");
      });
  };

  return (
    <div className="signup-container">
      <div style={{ 
        backgroundImage:"url(./Bg.jpg)"
       }} className="image-column">
      </div>
      <div className="form-container">
        <h2>Signup to Your Robo Lawyer Account</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            Occupation:
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </label>

          <button type="submit">Signup</button>
          <p>
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Signup;
