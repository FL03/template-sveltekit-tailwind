import { auth, firestore } from '$lib/firebase/admin/admin.server';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const { cookies, locals } = event;

  locals.token = null; // default if session cookie fails
  locals.user = null; // default if session cookie fails
  const session = cookies.get('session');

  if (session) {
    // if session cookie is set, verify it is valid and set the user from it
    try {
      const user = await auth.verifySessionCookie(session);
      locals.token = user;
      locals.user = { email: user.email || '', name: user.name, ...user };
      firestore
        .collection('users')
        .doc(user.uid)
        .set({ ...locals.user }, { merge: true });
    } catch (err) {
      console.error('error verifying session cookie', session, err);
    }
  }

  return resolve(event);
}
