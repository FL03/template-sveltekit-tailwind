/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
  // const doc = await firestore.collection('users').doc(`${params.user}`).get();
  return {
    params
  };
}
