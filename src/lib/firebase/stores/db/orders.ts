import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import type { Firestore } from 'firebase/firestore';

import { app, auth } from '$lib/firebase/stores';

export declare interface Order {
  id: string;
  user?: string;
}

export declare interface OrderFilter {
  start?: Date;
  limit: number;
}

/**
 * A custom store for managing the order filter
 */
function createOrderFilter() {
  const INITIAL: OrderFilter = { limit: 10 };
  const STATE: OrderFilter = { ...INITIAL };

  const { subscribe, set } = writable<OrderFilter>(STATE);

  function update(part: Partial<OrderFilter>) {
    Object.assign(STATE, part);
    set(STATE);
  }

  return {
    subscribe,
    reset: () => set(INITIAL),
    first: () => update({ start: undefined }),
    next: (start: Date) => update({ start }),
    size: (limit: number) => update({ limit, start: undefined })
  };
}

export const orderFilter = createOrderFilter();

//<[Readable<FirebaseApp>, Readable<Auth>, Writable<OrderFilter>], Firestore>
/**
 * Creates a Firestore store that is updated when the app, auth, or filter changes.
 */
function createOrders() {
  let firestore: Firestore;

  const { subscribe } = derived(
    [app, auth, orderFilter],
    ([$app, $auth, $filter], set) => {
      let unsubscribe;

      async function init() {
        if ($app && $auth) {
          const { getFirestore, collection, query, where, orderBy, limit, startAfter, onSnapshot } =
            await import('firebase/firestore');
          firestore = getFirestore($app);

          let q = query(collection(firestore, 'orders'));

          q = query(q, where('user', '==', $auth.currentUser?.uid));
          q = query(q, orderBy('ordered', 'desc'));
          q = query(q, startAfter('ordered', $filter.start));
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
    [] as Order[]
  );

  return { subscribe };
}

export const orders = createOrders();
