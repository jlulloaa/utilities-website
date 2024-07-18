// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FBAPIKEY,
  authDomain: process.env.REACT_APP_FBAUTHDOMAIN,
  projectId: process.env.REACT_APP_FBPROJECTID,
  storageBucket: process.env.REACT_APP_FBSTORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FBMESSAGINGSENDERID,
  appId: process.env.REACT_APP_FBAPPID,
  measurementId: process.env.REACT_APP_FBMEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };