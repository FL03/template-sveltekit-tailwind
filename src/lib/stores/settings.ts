import { browser, dev } from '$app/environment';
import { writable } from 'svelte/store';

import { devConfig } from '$lib/firebase';
import type { Settings } from '$lib/types';

// Loads up the firebase app on demand and places it into a store
// The store is then used to derive stores for auth, firestore, and other services
function createSettings() {
  const INITIAL = { firebase: devConfig, locale: 'en', theme: 'light' };
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
