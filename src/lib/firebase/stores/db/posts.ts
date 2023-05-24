import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import { app, auth } from '$lib/firebase/stores';
import { Post, postConverter } from '$lib/models';
import { page_size } from '$lib';

import type { PostFilter } from '$lib/models';
import type { Firestore } from 'firebase/firestore';

/**
 * A custom store for managing the order filter
 */
function createPostFilter() {
  const INITIAL: PostFilter = { start: null, limit: page_size };
  const STATE: PostFilter = { ...INITIAL };

  const { subscribe, set } = writable<PostFilter>(STATE);

  function update(part: Partial<PostFilter>) {
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

const postFilter = createPostFilter();

//<[Readable<FirebaseApp>, Readable<Auth>, Writable<OrderFilter>], Firestore>
/**
 * Creates a Firestore store that is updated when the app, auth, or filter changes.
 */
function createPosts() {
  let firestore: Firestore;

  const { subscribe } = derived(
    [app, auth, postFilter],
    ([$app, $auth, $filter], set) => {
      let unsubscribe;

      async function init() {
        if ($app && $auth) {
          const { getFirestore, collection, query, where, orderBy, limit, startAfter, onSnapshot } =
            await import('firebase/firestore');
          firestore = getFirestore($app);

          let q = query(collection(firestore, 'posts'));

          q = query(q, where('user', '==', $auth.currentUser?.uid));
          q = query(q, orderBy('createdAt', 'desc'));
          q = query(q, startAfter('createdAt', $filter.start));
          q = query(q, limit($filter.limit));

          unsubscribe = onSnapshot(q, (snap) =>
            set(snap.docs.map((doc) => (postConverter.fromFirestore(doc, {}))))
          );
        } else {
          set([]);
        }
      }

      if (browser) init();

      return unsubscribe;
    },
    [] as Post[]
  );

  return { subscribe };
}

// Initialize the store
const posts = createPosts();

export { posts, postFilter };
