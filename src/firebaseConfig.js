import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../expo-env';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app); // Also exporting Firestore instance if needed later

// console.log("Firebase Config Initialized. Project ID:", firebaseConfig.projectId); // Keep log for confirmation
