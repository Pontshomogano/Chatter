// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAP4aaUulIqLtURjTkuthdQnsShPZgvnKo",
  authDomain: "chatter-ffdb4.firebaseapp.com",
  projectId: "chatter-ffdb4",
  storageBucket: "chatter-ffdb4.appspot.com",
  messagingSenderId: "1024556856606",
  appId: "1:1024556856606:web:f3e867cd47607115b3c50f",
  measurementId: "G-3DRVS162E2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const imageDb = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db , imageDb};
