import { browser, dev } from '$app/environment';
// import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';
import { readable } from 'svelte/store';
import { devConfig, firebaseConfig } from '$lib/firebase/firebase.config.js';

// const firebaseConfig: FirebaseOptions = JSON.parse(PUBLIC_FIREBASE_CONFIG);

if (dev) {
  console.log('firebaseConfig (client)', devConfig);
}

/**
 * @description Loads up the firebase app on demand and places it into a store
 * The store is then used to derive stores for auth, firestore, and other services
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.app.App
 * @see https://svelte.dev/docs#svelte_store
 */
function createApp(): import('svelte/store').Readable<import('firebase/app').FirebaseApp> {
  let app: import('firebase/app').FirebaseApp;

  const { subscribe } = readable<import('firebase/app').FirebaseApp>(undefined, (set) => {
    async function init() {
      if (!app) {
        const { initializeApp } = await import('firebase/app');
        app = initializeApp(dev ? devConfig : firebaseConfig);
      }
      set(app);
    }

    if (browser) init();
  });

  return { subscribe };
}

// Export an instance of the app store
export const app = createApp();
