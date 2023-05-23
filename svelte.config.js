import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';
import multiAdapter from '@macfja/svelte-multi-adapter';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: multiAdapter([
      adapterNode({
        polyfill: true
      }), 
      adapterVercel()
    ])
  },
  preprocess: vitePreprocess({
    postcss: true
  })
};

export default config;