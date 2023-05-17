import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoadEvent} */
export async function load({ parent }) {
  const { user } = await parent();
  throw redirect(307, user ? `/profile/@${user.username}` : '/login');
}
