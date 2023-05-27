<script>
  import '$lib/assets/css/app.css';
  import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
  import { Appbar, Footer, Navbar } from '$lib/cmp';
  import { session } from '$lib/firebase/stores';
  import { GoogleMaps } from '@svkcl/google-maps';

  /** @type {import('./$types').PageData}*/
  export let data;

  $: user = $session.user;
</script>

<svelte:head />

<GoogleMaps apiKey={PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['places', 'visualization']} />

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
