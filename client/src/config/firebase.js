import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCOm-ZAhVn-ONK6ZJyW2mgfAvm0mrnxBQg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "roamvista-de0e9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "roamvista-de0e9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "roamvista-de0e9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "790754345902",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:790754345902:web:13d4d9682895ae73617e3f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-1PM4NW3RQ9",
};

let app = null;
let auth = null;
let googleProvider = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
} catch (error) {
  console.warn('[Firebase Initialization Warning]', error);
}

export { auth, googleProvider };
export default app;
