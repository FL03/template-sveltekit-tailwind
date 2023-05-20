import { error, redirect } from '@sveltejs/kit';

import { firestore } from '$lib/firebase/admin/admin.server';
import { postConverter } from '$lib/models/posts';

/** @type { import('./$types').PageServerLoad } */
export async function load({ params }) {
  const post = await firestore.collection('posts').doc(`${params.slug}`).get();
  const cmt = await firestore.collection(`posts/${params.slug}/comments`).get();

  if (!post.data()) throw error(404);

  return { article: { ...post.data() }, comments: cmt.docs.map((c) => ({ ...c.data() })) };
}

/** @type { import('./$types').Actions } */
export const actions = {
  createComment: async ({ locals, params, request }) => {
    if (!locals.user) throw error(401);

    const data = await request.formData();

    await firestore.collection(`posts/${params.slug}/comments`).add({ body: data.get('comment') });
  },

  deleteComment: async ({ locals, params, url }) => {
    if (!locals.user) throw error(401);

    const id = url.searchParams.get('id');
    // TODO: check if comment belongs to user
    await firestore.collection(`posts/${params.slug}/comments`).doc(`${id}`).delete();

    // if (result.error) throw error(result.status, result.error);
  },

  deleteArticle: async ({ locals, params }) => {
    if (!locals.user) throw error(401);

    await firestore.collection(`posts`).doc(`${params.slug}`).delete();
    throw redirect(307, '/');
  },

  toggleFavorite: async ({ locals, params, request }) => {
    if (!locals.user) throw error(401);

    const data = await request.formData();
    const favorited = data.get('favorited') !== 'on';

    if (favorited) {
      await firestore
        .collection(`users`)
        .doc(`${locals.user.uid}`)
        .set({ favorites: { [params.slug]: true } }, { merge: true });
    } else {
      await firestore
        .collection(`users`)
        .doc(`${locals.user.uid}`)
        .set({ favorites: { [params.slug]: null } }, { merge: true });
    }

    throw redirect(307, request.headers.get('referer') ?? `/feed/${params.slug}`);
  }
};