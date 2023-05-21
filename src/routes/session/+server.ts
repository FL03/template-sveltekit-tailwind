import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { auth } from '$lib/firebase/admin/admin.server';

import type { RequestHandler } from '@sveltejs/kit';

import { temporal } from '$lib/constants';

// POST receives the client-side auth token, validates it and sets a cookie for future server-requests
export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = await request.text();

  const user = await auth.verifyIdToken(token);
  const sessionCookie = await auth.createSessionCookie(token, { expiresIn: temporal.ms.week });
  const options = { maxAge: temporal.s.week, httpOnly: true, secure: !dev };
  cookies.set('session', sessionCookie, options);

  return json(_getSession(user));
};

// DELETE clears the session cookie
export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete('session');

  return json(_getSession(null));
};

export function _getSession(user: any | null) {
  if (user) {
    return {
      user: {
        email: user.email || '',
        email_verified: user.email_verified || false,
        name: user.name,
        phone_number: user.phone_number,
        picture: user.picture,
        username: user.username || '',
        ...user
      }
    };
  }
  return { user };
}
