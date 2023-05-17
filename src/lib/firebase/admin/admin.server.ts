import { dev } from '$app/environment';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

/** @type {import('firebase-admin/app').AppOptions} */
let firebaseConfig;

if (dev || process.env.NODE_ENV === 'development') {
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099';
  process.env['FIRESTORE_EMULATOR_HOST'] = '127.0.0.1:9098';
}

if (dev) {
  firebaseConfig = {
    projectId: 'svkcl-d7eb1',
    storageBucket: 'demo.appspot.com'
  };
  console.log('firebaseConfig (server)', firebaseConfig);
} else {
  firebaseConfig = {
    projectId: 'svkcl-d7eb1',
    storageBucket: 'svkcl-d7eb1.appspot.com'
  };
}

// this is the server-side firebase client
export const app = initializeApp(firebaseConfig, 'server' + Math.random());
export const auth = getAuth(app);
export const firestore = getFirestore(app);
