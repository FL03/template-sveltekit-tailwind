import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

import { app, auth } from '$lib/firebase/stores';
import type { User, UserFilter } from '$lib/models/users';

/**
 * A custom store for managing the order filter
 */
function createUserFilter() {
  const INITIAL: UserFilter = { start: null, limit: 10 };
  const STATE: UserFilter = { ...INITIAL };

  const { subscribe, set } = writable<UserFilter>(STATE);

  function update(part: Partial<UserFilter>) {
    Object.assign(STATE, part);
    set(STATE);
  }

  return {
    subscribe,
    reset: () => set(INITIAL),
    first: () => update({ start: null }),
    next: (start: Date) => update({ start }),
    size: (limit: number) => update({ limit, start: null })
  };
}

export const userFilter = createUserFilter();

//<[Readable<FirebaseApp>, Readable<Auth>, Writable<UserFilter>], User[]>
/**
 * Creates a Firestore store that is updated when the app, auth, or filter changes.
 */
function createUsers() {
  let firestore: Firestore;

  const { subscribe } = derived(
    [app, auth, userFilter],
    ([$app, $auth, $filter], set) => {
      let unsubscribe;

      async function init() {
        if ($app && $auth) {
          const { getFirestore, collection, query, where, orderBy, limit, startAfter, onSnapshot } =
            await import('firebase/firestore');
          firestore = getFirestore($app);

          let q = query(collection(firestore, 'users'));

          q = query(q, orderBy('name', 'desc'));
          q = query(q, limit($filter.limit));

          unsubscribe = onSnapshot(q, (snap) =>
            set(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          );
        } else {
          set([]);
        }
      }

      if (browser) init();

      return unsubscribe;
    },
    [] as User[]
  );

  return { subscribe };
}

export const users = createUsers();
