// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_firebaseAPIKey)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_firebaseAPIKey,
  authDomain: "myblog-mern.firebaseapp.com",
  projectId: "myblog-mern",
  storageBucket: "myblog-mern.appspot.com",
  messagingSenderId: "1055981936849",
  appId: "1:1055981936849:web:24a8f0406063eacc37a5f0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);