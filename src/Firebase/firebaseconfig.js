// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "@firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAtyuQNuPZtBPh7GjhBVMYvNtXzmpLDBu0",
  authDomain: "robolawyermain.firebaseapp.com",
  databaseURL:"https://robolawyermain-default-rtdb.firebaseio.com/",
  projectId: "robolawyermain",
  storageBucket: "robolawyermain.appspot.com",
  messagingSenderId: "117650300228",
  appId: "1:117650300228:web:587d710d29941daf48cb11",
  measurementId: "G-BK7C47NC8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);