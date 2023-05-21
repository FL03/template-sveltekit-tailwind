<script>
  import '$lib/assets/css/app.css';
  import { Appbar, Footer, Navbar } from '$lib/cmp';
  import { session } from '$lib/firebase/stores';
  import { GoogleMaps } from '@svkcl/google-maps';

  /** @type {import('./$types').PageData}*/
  export let data;

  $: user = $session.user;
</script>

<svelte:head>
  <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
  <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
</svelte:head>

<GoogleMaps
  apiKey={'AIzaSyBTyELyLAMZB9yFQK8SM5iZTjEJd3d0bHg'}
  libraries={['places', 'visualization']}
/>

<div
  class="flex flex-col min-h-screen min-w-full max-w-screen m-0 p-0 bg-white dark:bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-black dark:text-white"
>
  <Navbar {user} />
  <main class="container mx-auto items-center m-0">
    <slot />
  </main>
</div>

{#if user}
  <Appbar {user} />
{:else}
  <Footer />
{/if}

<style>
</style>
