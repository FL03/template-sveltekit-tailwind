import { fail, redirect } from '@sveltejs/kit';

/** @type { import('./$types').PageServerLoad } */
export async function load({ locals }) {
  return {
    user: locals.user
  }
}

/** @type {import('./$types').Actions} */
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
