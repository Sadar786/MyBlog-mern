
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_firebaseAPIKey,
  authDomain: "myblog-mern.firebaseapp.com",
  projectId: "myblog-mern",
  storageBucket: "myblog-mern.appspot.com",
  messagingSenderId: "1055981936849",
  appId: "1:1055981936849:web:24a8f0406063eacc37a5f0"
};

export const app = initializeApp(firebaseConfig);