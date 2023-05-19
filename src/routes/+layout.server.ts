import { _getSession } from './session/+server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
  const { user } = locals;
  const session = _getSession(user);

  // layout data could also return additional data other than the session
  return {
    session
  };
}