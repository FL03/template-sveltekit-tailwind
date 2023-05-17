import { get_articles } from '../articles';

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load(event) {
  const { articles, page } = await get_articles(event, 'favorited');
  return { articles, page };
}
