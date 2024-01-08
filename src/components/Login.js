import React, { useState } from 'react';
import './Login.css';
import { useNavigate,Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseconfig'
import { getDatabase, ref, onValue } from "firebase/database";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const db = getDatabase();

  const handleLogin = (e) => {
    if(username==''){
      setMessage('username cannot be null')
      return
    }
    if(password==''){
      setMessage('password cannot be null')
      return
    }
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const starCountRef = ref(db, 'users/' + user.uid);
          onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();


              // Cache data locally
              localStorage.setItem('City', data['City'])
              localStorage.setItem('Country', data['Country'])
              localStorage.setItem('address', data['address'])
              localStorage.setItem('person_email', data['person_email'])
              localStorage.setItem('person_name', data['person_name'])
              localStorage.setItem('zip_code', data['zip_code'])
              alert("Login Successfull!!");
              navigate("/UserHomepage");
          });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Failed to Login!!");
        });
   
    

  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login to Your Robo Lawyer Account</h2>
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
            Choose Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit">Login</button>
          Do not have an account? <Link to="/">Signup</Link>

        </form>
        <p className="message">{message}</p>

      </div>
    </div>
  );
};

export default LoginForm;
