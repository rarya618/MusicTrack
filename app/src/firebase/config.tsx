// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEobycveo7YAj7GgiogqbWHwhnvEx_PBU",
  authDomain: "music-track-russ.firebaseapp.com",
  projectId: "music-track-russ",
  storageBucket: "music-track-russ.appspot.com",
  messagingSenderId: "1097815708951",
  appId: "1:1097815708951:web:dbd6e2480e0ac267a05352",
  measurementId: "G-W06PEC3JTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const analytics = getAnalytics(app);

export {app, db, analytics}