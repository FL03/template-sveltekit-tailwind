import { fail, redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load({ parent }) {
  const { session } = await parent();
  if (session.user) throw redirect(307, '/');
}

/** @type {import('@sveltejs/kit').Actions} */
export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();

    const user = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password')
    };

    const body = {
      user
    };

    // if (body.errors) {
    //   return fail(401, body);
    // }

    const value = btoa(JSON.stringify(body.user));
    cookies.set('jwt', value, { path: '/' });

    throw redirect(307, '/');
  }
};
