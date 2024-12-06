// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvp0aQXobNOogxUv0IB-jdTgwxeifomzI",
  authDomain: "bookify-c6c4e.firebaseapp.com",
  projectId: "bookify-c6c4e",
  storageBucket: "bookify-c6c4e.firebasestorage.app",
  messagingSenderId: "693230280121",
  appId: "1:693230280121:web:f4dd9b25e64b69dd9daa68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);