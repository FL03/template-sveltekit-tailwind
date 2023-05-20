/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load(event) {
  return {
    params: event.params
  };
}
