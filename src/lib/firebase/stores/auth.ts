/**
 * @file auth.ts
 * @description firebase auth store
 *
 */
import { derived, type Readable } from 'svelte/store';
import { browser, dev } from '$app/environment';
import type { Auth, User } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { app } from './app';

// load the firebase auth client as a store and provide an API to access its methods
// this depends on the app store and will also only be loaded on demand
// so no firebase JS loaded unless the page needs it
const createAuth = () => {
  let auth: Auth;

  const { subscribe } = derived<Readable<FirebaseApp>, Auth>(app, ($app, set) => {
    async function init() {
      if ($app && !auth) {
        const { getAuth, connectAuthEmulator } = await import('firebase/auth');
        auth = getAuth($app);
        if (dev) {
          connectAuthEmulator(auth, 'http://localhost:9099');
        }
        set(auth);
      }
    }

    if (browser) init();
  });

  async function currentUser(): Promise<User | null> {
    return auth.currentUser;
  }

  async function providerFor(name: string) {
    const { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider } = await import(
      'firebase/auth'
    );
    switch (name) {
      case 'github':
        return new GithubAuthProvider();
      case 'google':
        return new GoogleAuthProvider();
      case 'twitter':
        return new TwitterAuthProvider();
      default:
        throw 'unknown provider ' + name;
    }
  }

  async function signInAnonymously() {
    const { signInAnonymously } = await import('firebase/auth');
    await signInAnonymously(auth);
  }

  async function signInWithPopup(name: string) {
    const { signInWithPopup } = await import('firebase/auth');
    const provider = await providerFor(name);
    await signInWithPopup(auth, provider);
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signInWith(name: string) {
    const { signInWithRedirect } = await import('firebase/auth');
    const provider = await providerFor(name);
    await signInWithRedirect(auth, provider);
  }

  async function signOut() {
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
  }

  return {
    subscribe,
    currentUser,
    signInAnonymously,
    signInWith,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
  };
};

export const auth = createAuth();
