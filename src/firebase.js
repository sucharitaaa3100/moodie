
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvXIEXPx3X30lpX62quiDC7uKXiZnPuWM",
  authDomain: "moodtracker-f2eff.firebaseapp.com",
  projectId: "moodtracker-f2eff",
  storageBucket: "moodtracker-f2eff.firebasestorage.app",
  messagingSenderId: "628471182849",
  appId: "1:628471182849:web:d789af8cef93ba385eb200"
};


const app = initializeApp(firebaseConfig);
export {app, getAuth};