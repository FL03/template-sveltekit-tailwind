import * as api from '$lib/api/realworld';
import { page_size } from '$lib/constants';

export async function get_articles({ url, params, locals }, type) {
  const p = +url.searchParams.get('page') || 1;

  const q = new URLSearchParams();
  q.set('limit', page_size.toString());
  q.set('offset', ((p - 1) * page_size).toString());
  q.set(type, params.user);

  const { articles, articlesCount } = await api.get(
    `articles?${q}`,
    locals.user && locals.user.token
  );

  return {
    articles,
    pages: Math.ceil(articlesCount / page_size)
  };
}
