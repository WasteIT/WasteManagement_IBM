// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrUXDmmZzLtLWYNdqwh4jhFbQvR51SP4A",
  authDomain: "wasteit-193de.firebaseapp.com",
  databaseURL: "https://wasteit-193de-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wasteit-193de",
  storageBucket: "wasteit-193de.appspot.com",
  messagingSenderId: "956930927762",
  appId: "1:956930927762:web:b0d69690f1091005f04a4b",
  measurementId: "G-DJY9G44K2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;