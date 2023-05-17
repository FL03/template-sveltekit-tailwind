import * as api from '$lib//api/realworld';
import { firestore } from '$lib/firebase/admin/admin.server';
import { page_size } from '$lib/constants';
import { error, fail } from '@sveltejs/kit';
import { get_articles } from './articles';

/** @type {import('@sveltejs/kit').Actions} */
export const actions = {
  toggleFollow: async ({ locals, params, request }) => {
    if (!locals.user) throw error(401);

    const data = await request.formData();
    const following = data.get('following') !== 'on';

    const result = following
      ? await api.post(`profiles/${params.user}/follow`, null, locals.user.token)
      : await api.del(`profiles/${params.user}/follow`, locals.user.token);

    if (result.errors) {
      return fail(422, result);
    }
  }
};