import { dev } from '$app/environment';
import { applicationDefault, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (dev) {
  // https://firebase.google.com/docs/emulator-suite/connect_and_prototype
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099';
  process.env['FIRESTORE_EMULATOR_HOST'] = '127.0.0.1:9098';
}
/**
 * @description Firebase Admin SDK configuration; this is the server-side firebase client
 * @see https://firebase.google.com/docs/reference/admin/node/admin.credential#cert
 */
const appOptions: import('firebase-admin/app').AppOptions = {
  credential: applicationDefault(),
  projectId: 'svkcl-d7eb1',
  storageBucket: `${dev ? 'demo' : 'svkcl-d7eb1'}.appspot.com`
};

// this is the server-side firebase client
export const app = initializeApp(appOptions, 'server' + Math.random());
export const auth = getAuth(app);
export const firestore = getFirestore(app);
