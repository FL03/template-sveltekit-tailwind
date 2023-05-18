import { browser, dev } from '$app/environment';
import { writable } from 'svelte/store';
import { devConfig, firebaseConfig } from '$lib/firebase/firebase.config.js';

// const firebaseConfig: FirebaseOptions = JSON.parse(PUBLIC_FIREBASE_CONFIG);

if (dev) {
  console.log('firebaseConfig (client)', devConfig);
}

export declare interface Provider<T = unknown> {
  config: T;
  name: string;
  scopes: string[];
}

export declare interface Settings {
  firebase: import('firebase/app').FirebaseOptions;
  locale: string;
  providers: Provider[];
}

export class Settings implements Settings {
  constructor() {
    this.firebase = devConfig;
    this.locale = 'en';
    this.providers = [];
  }
}

// Loads up the firebase app on demand and places it into a store
// The store is then used to derive stores for auth, firestore, and other services
function createSettings() {
  const INITIAL = { firebase: devConfig, locale: 'en' };
  const STATE = { ...INITIAL };

  const { subscribe, set } = writable(STATE);

  function update(part: Partial<Settings>) {
    Object.assign(STATE, part);
    set(STATE);
  }

  return {
    subscribe,
    reset: () => set(INITIAL),
    update: (part: Partial<Settings>) => update(part)
  };
}

export const settings = createSettings();
