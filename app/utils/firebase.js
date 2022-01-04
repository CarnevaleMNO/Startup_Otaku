// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXvqKgbpwRgv8mzyFYOPszqFg-sK7MJYo",
  authDomain: "startup-otaku.firebaseapp.com",
  projectId: "startup-otaku",
  storageBucket: "startup-otaku.appspot.com",
  messagingSenderId: "229514473089",
  appId: "1:229514473089:web:41f813e48267bd150ea780",
  measurementId: "G-HJ41LQFQ2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app)

export { auth }