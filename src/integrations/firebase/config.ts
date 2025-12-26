// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_zNQs9iIIxvtGl4ZiXaY6fpDsoN-uRT8",
  authDomain: "ak-projects-backend.firebaseapp.com",
  projectId: "ak-projects-backend",
  storageBucket: "ak-projects-backend.firebasestorage.app",
  messagingSenderId: "202011794844",
  appId: "1:202011794844:web:2ad9c2712bf01818fafc59",
  measurementId: "G-94ZBH8HWL3"
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// Initialize Firebase only if it hasn't been initialized already
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  
  // Initialize Analytics only in browser environment
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
  
  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  app = getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Get analytics if in browser
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
}

// Export Firebase services
export { app, analytics, auth, db, storage };

// Export types for convenience
export type { FirebaseApp, Analytics, Auth, Firestore, FirebaseStorage };

