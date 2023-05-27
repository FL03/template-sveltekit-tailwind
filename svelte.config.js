import adapter from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';
import multiAdapter from '@macfja/svelte-multi-adapter';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess({
    postcss: true
  })
};

export default config;