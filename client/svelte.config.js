import adapter from '@sveltejs/adapter-node';
import adapter_vercel from '@sveltejs/adapter-vercel';
import firebase from 'svelte-adapter-firebase';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		...(process.env.ADAPTER === "node") && {
			adapter: adapter()
		},
		...(process.env.ADAPTER === "vercel") && {
			adapter: adapter_vercel()
		},
		...(process.env.ADAPTER === "firebase") && {
			adapter: firebase()
		}
	},
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};

export default config;
