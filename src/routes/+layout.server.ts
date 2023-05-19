import { _getSession } from './session/+server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
  const { token, user } = locals;
  const session = _getSession(token);

  // layout data could also return additional data other than the session
  return {
    session
  };
}