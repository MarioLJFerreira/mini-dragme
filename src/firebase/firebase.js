// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCalE6UBEP6X3ZX7R19tC5VoKO03wgAoTo",
  authDomain: "dragme-mini.firebaseapp.com",
  projectId: "dragme-mini",
  storageBucket: "dragme-mini.firebasestorage.app",
  messagingSenderId: "188367279980",
  appId: "1:188367279980:web:c7e89f7baddad156fac549",
  measurementId: "G-V1EWT37PXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };