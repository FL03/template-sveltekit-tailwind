import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { applicationDefault, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * @description Firebase Admin SDK configuration; this is the server-side firebase client
 * @see https://firebase.google.com/docs/reference/admin/node/admin.credential#cert
 */
let appOptions: import('firebase-admin/app').AppOptions;

if (dev) {
  // https://firebase.google.com/docs/emulator-suite/connect_and_prototype
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099';
  process.env['FIRESTORE_EMULATOR_HOST'] = '127.0.0.1:9098';
  appOptions = {
    projectId: 'svkcl-d7eb1',
    storageBucket: 'demo.appspot.com'
  };
  console.log('firebaseConfig (server)', appOptions);
} else {
  // https://firebase.google.com/docs/reference/admin/node/admin.credential#cert
  if (env.GOOGLE_APPLICATION_CREDENTIALS) {
    const serviceAccount = JSON.parse(env.GOOGLE_APPLICATION_CREDENTIALS);
    appOptions = {
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
      storageBucket: `${serviceAccount.project_id}.appspot.com`
    };
  } else {
    appOptions = {
      credential: applicationDefault(),
      projectId: 'svkcl-d7eb1',
      storageBucket: `svkcl-d7eb1.appspot.com`
    };
  }
  
}

// this is the server-side firebase client
export const app = initializeApp(appOptions, 'server' + Math.random());
export const auth = getAuth(app);
export const firestore = getFirestore(app);
