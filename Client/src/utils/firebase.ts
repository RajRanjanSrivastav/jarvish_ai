// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jarvish-d3a4b.firebaseapp.com",
  projectId: "jarvish-d3a4b",
  storageBucket: "jarvish-d3a4b.firebasestorage.app",
  messagingSenderId: "891343439550",
  appId: "1:891343439550:web:977d2b60b5b925ee7680ef",
};

console.log("API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
