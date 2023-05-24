import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import type { Firestore, Timestamp } from 'firebase/firestore';
import { app, auth } from '$lib/firebase';
import { page_size, userConverter } from '$lib';
import type { User } from '$lib';

export declare interface UserFilter {
  limit: number;
  name?: string;
  start?: Timestamp
}
/**
 * A custom store for managing the order filter
 */
function createUserFilter() {
  const INITIAL: UserFilter = { limit: page_size };
  const STATE: UserFilter = { ...INITIAL };

  const { subscribe, set } = writable<UserFilter>(STATE);

  function update(part: Partial<UserFilter>) {
    Object.assign(STATE, part);
    set(STATE);
  }

  return {
    subscribe,
    reset: () => set(INITIAL),
    first: () => update({ start: undefined }),
    next: (start: Timestamp) => update({ start }),
    size: (limit: number) => update({ limit })
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
            set(snap.docs.map((doc) => (userConverter.fromFirestore(doc, {}))))
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
