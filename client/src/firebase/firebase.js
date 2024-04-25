// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY, // hidden
  authDomain: "mern-blog-dc44e.firebaseapp.com",
  projectId: "mern-blog-dc44e",
  storageBucket: "mern-blog-dc44e.appspot.com",
  messagingSenderId: "237107126501",
  appId: "1:237107126501:web:e809ae3b2971290ceab40c",
};

// Initialize Firebase then export
export const app = initializeApp(firebaseConfig);
