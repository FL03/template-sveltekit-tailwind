
import firebase from 'svelte-adapter-firebase';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: firebase()
	},
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};

export default config;
