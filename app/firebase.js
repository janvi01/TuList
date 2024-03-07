// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tulist-1e3a6.firebaseapp.com",
  projectId: "tulist-1e3a6",
  storageBucket: "tulist-1e3a6.appspot.com",
  messagingSenderId: "1021818090357",
  appId: "1:1021818090357:web:38eb75a3539b993591993c",
  measurementId: "G-YL8ZMJL6F6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
