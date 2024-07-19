// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "travelguruji-66587.firebaseapp.com",
  projectId: "travelguruji-66587",
  storageBucket: "travelguruji-66587.appspot.com",
  messagingSenderId: "797384265709",
  appId: "1:797384265709:web:365432852a30c7b13561e4",
  measurementId: "G-S6M4W70L1T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);