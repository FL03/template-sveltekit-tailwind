import { browser, dev } from '$app/environment';
import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';

import type {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  Query,
  QueryConstraint,
  WithFieldValue
} from 'firebase/firestore';

import { app } from './app';
import { auth } from './auth';

/**
 * Creates a Firestore store that is updated when the app or auth stores change.
 */
function createFirestore() {
  let firestore: Firestore;

  const { subscribe } = derived<[Readable<FirebaseApp>, Readable<Auth>], Firestore>(
    [app, auth],
    ([$app, $auth], set) => {
      async function init() {
        if ($auth) {
          const { getFirestore, connectFirestoreEmulator } = await import('firebase/firestore');
          firestore = getFirestore($app);
          if (dev) {
            connectFirestoreEmulator(firestore, 'localhost', 9098);
          }
          set(firestore);
        }
      }

      if (browser) init();
    }
  );

  async function colref(
    ref: string | CollectionReference,
    ...segments: string[]
  ): Promise<CollectionReference<DocumentData>> {
    const { collection } = await import('firebase/firestore');
    return typeof ref === 'string' ? collection(firestore, ref, ...segments) : ref;
  }

  async function docref(
    ref: string | DocumentReference,
    ...segments: string[]
  ): Promise<DocumentReference<DocumentData>> {
    const { doc } = await import('firebase/firestore');
    return typeof ref === 'string' ? doc(firestore, ref, ...segments) : ref;
  }

  async function create(
    ref: string | CollectionReference,
    data: WithFieldValue<Record<string, unknown>>
  ) {
    const { addDoc } = await import('firebase/firestore');
    return addDoc(await colref(ref), data);
  }

  async function del(ref: string | DocumentReference) {
    const { deleteDoc } = await import('firebase/firestore');
    return deleteDoc(await docref(ref));
  }

  async function getDocument(ref: string | DocumentReference) {
    const { getDoc } = await import('firebase/firestore');
    return getDoc(await docref(ref));
  }

  async function getDocuments(ref: string | CollectionReference | Query) {
    const { getDocs } = await import('firebase/firestore');
    if (typeof ref === 'string') ref = await colref(ref);
    return await getDocs(ref);
  }

  async function query(ref: string | CollectionReference, ...opts: QueryConstraint[]) {
    const { query } = await import('firebase/firestore');
    return query(await colref(ref), ...opts);
  }

  async function set(ref: string | DocumentReference, data: DocumentData) {
    const { setDoc } = await import('firebase/firestore');
    return setDoc(await docref(ref), data, { merge: true });
  }

  async function update(ref: string | DocumentReference, data: DocumentData) {
    const { updateDoc } = await import('firebase/firestore');
    return updateDoc(await docref(ref), data);
  }

  return {
    subscribe,
    create,
    colref,
    docref,
    del,
    getDocument,
    getDocuments,
    query,
    set,
    update
  };
}

export const firestore = createFirestore();
