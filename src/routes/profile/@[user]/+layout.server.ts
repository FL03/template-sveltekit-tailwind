import * as api from '$lib/api/realworld';
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
async function loader({ locals, params }) {
  const { profile } = await api.get(`profiles/${params.user}`, locals.user?.token);

  return {
    profile
  };
}
