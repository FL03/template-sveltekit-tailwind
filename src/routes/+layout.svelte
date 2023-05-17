<script>
  import '$lib/assets/css/app.css';
  import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
  import { Appbar, Footer, Navbar } from '$lib/cmp';
  import { GoogleMaps } from '@svkcl/google-maps';

  /** @type {import('./$types').PageData}*/
  export let data;
</script>

<svelte:head>
  <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
  <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
</svelte:head>

<GoogleMaps
  apiKey={PUBLIC_GOOGLE_MAPS_API_KEY}
  libraries={['places', 'visualization']}
/>

<div
  class="flex flex-col min-h-screen min-w-full max-w-screen m-0 p-0 bg-white dark:bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-black dark:text-white"
>
  <Navbar />
  <main class="container mx-auto items-center m-0">
    <slot />
  </main>
</div>

{#if data.session.user}
  <Appbar />
{:else}
  <Footer />
{/if}

<style>
</style>
