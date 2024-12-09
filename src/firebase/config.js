import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyCwdqeMC26GguTwqJHWp_x0mBV4ewZWArs",
  authDomain: "team10-f486a.firebaseapp.com",
  projectId: "team10-f486a",
  storageBucket: "team10-f486a.firebasestorage.app",
  messagingSenderId: "444583717355",
  appId: "1:444583717355:web:f8bea0c557d78d874f11ae",
  measurementId: "G-5X3GNRPY0J"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
 
export { database, analytics };