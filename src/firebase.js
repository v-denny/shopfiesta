// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiq7LC3kMTFFJG43A3opB7eu-JGaCo310",
  authDomain: "shopfiesta-in.firebaseapp.com",
  projectId: "shopfiesta-in",
  storageBucket: "shopfiesta-in.firebasestorage.app",
  messagingSenderId: "393931920413",
  appId: "1:393931920413:web:6bda58e3ae7f38d3d462f4",
  measurementId: "G-S9B0LNDKWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Auth
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
