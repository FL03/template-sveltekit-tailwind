import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load({ parent }) {
  const { session } = await parent();
  throw redirect(307, session.user ? `/profile/@${session.user.uid}` : '/login');
}
