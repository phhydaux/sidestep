// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpuSN3S3MpqtBylAnKq5czqcYvn62sQLY",
  authDomain: "sidestep-7b0a9.firebaseapp.com",
  projectId: "sidestep-7b0a9",
  storageBucket: "sidestep-7b0a9.appspot.com",
  messagingSenderId: "791907726071",
  appId: "1:791907726071:web:e3cbe1b58342eef72019f2",
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);