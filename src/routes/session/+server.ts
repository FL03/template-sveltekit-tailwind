import { json, type RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { auth } from '$lib/firebase/admin/admin.server';
import type { User } from '$lib/types/users';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const WEEK_IN_MILLISECONDS = WEEK_IN_SECONDS * 1000;

// POST receives the client-side auth token, validates it and sets a cookie for future server-requests
export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = await request.text();

  const user = await auth.verifyIdToken(token);
  const sessionCookie = await auth.createSessionCookie(token, { expiresIn: WEEK_IN_MILLISECONDS });
  const options = { maxAge: WEEK_IN_SECONDS, httpOnly: true, secure: !dev };
  cookies.set('session', sessionCookie, options);

  return json(_getSession({...user, name: user.name, email: user.email || ''}));
};

// DELETE clears the session cookie
export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete('session');

  return json(_getSession(null));
};

export function _getSession(user: User | null) {
  if (user) {
    return {
      user: {
        ...user,
        name: user.name,
        email: user.email || ''
      }
    };
  }
  return { user };
}
