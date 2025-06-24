// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let auth: Auth | null = null;
let db: Firestore | null = null;

const initFirebase = () => {
  try {
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY') {
      console.error("Firebase API key is missing or invalid. Check your environment variables.");
      return;
    }

    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
      console.log("Firebase initialized successfully");
    } else {
      app = getApps()[0];
    }

  auth = getAuth(app);
  db = getFirestore(app);
    
    // Enable offline persistence - this must be called in a client context
    if (typeof window !== 'undefined') {
      enableIndexedDbPersistence(db).catch((err) => {
        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a time.
          console.warn('Firebase persistence failed: Multiple tabs open');
        } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          console.warn('Firebase persistence not supported in this browser');
} else {
          console.error('Firebase persistence error:', err);
        }
      });
    }
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
};

// Initialize Firebase only on the client side
if (typeof window !== 'undefined') {
  initFirebase();
}

export { auth, db };
export default app;
