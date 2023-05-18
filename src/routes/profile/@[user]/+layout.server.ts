import { firestore } from '$lib/firebase/admin/admin.server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, params }) {
  const doc = await firestore.collection('users').doc(`${params.user}`).get();
  return {
    params,
    profile: { ...doc.data() },
    user: locals.user
  };
}
