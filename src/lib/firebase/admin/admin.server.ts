import { dev } from '$app/environment';
import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';

import type { FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (dev || process.env.NODE_ENV === 'development') {
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099';
  process.env['FIRESTORE_EMULATOR_HOST'] = '127.0.0.1:9098';
}

// Parse the FIREBASE_CONFIG string into a FirebaseOptions object
const firebaseConfig: FirebaseOptions = JSON.parse(PUBLIC_FIREBASE_CONFIG);

if (dev) {
  console.log('firebaseConfig (server)', firebaseConfig);
}

// this is the server-side firebase client
export const app = initializeApp(firebaseConfig, 'server' + Math.random());
export const auth = getAuth(app);
export const firestore = getFirestore(app);
