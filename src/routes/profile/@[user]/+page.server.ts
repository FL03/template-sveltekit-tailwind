import { firestore } from '$lib/firebase/admin/admin.server';
import { error, fail } from '@sveltejs/kit';

/** @type { import('./$types').PageServerLoad } */
export async function load({ params }) {
  return {
    params
  };
}

/** @type { import('./$types').Actions } */
export const actions = {
  toggleFollow: async ({ locals, params, request }) => {
    if (!locals.user) throw error(401);

    const data = await request.formData();
    const following = data.get('following') !== 'on';
    const result = await firestore
      .collection('users')
      .doc(locals.user.uid)
      .set({ following: { [params.user]: following } }, { merge: true });

    if (!result) {
      return fail(422, result);
    }
  }
};