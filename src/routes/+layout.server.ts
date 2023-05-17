import { _getSession } from './session/+server';

/** @type {import('@sveltejs/kit').LayoutServerLoad} */
export async function load({ locals }) {
  const { user } = locals;
  const session = _getSession(user);

  // layout data could also return additional data other than the session
  return { 
    session
  };
}

function loader({ locals }) {
  return {
    user: locals.user && {
      username: locals.user.username,
      email: locals.user.email,
      image: locals.user.image,
      bio: locals.user.bio
    }
  };
}
