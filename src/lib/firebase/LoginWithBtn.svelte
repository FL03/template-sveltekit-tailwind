<script>
  import { auth, session } from '$lib/firebase/stores';
  import { Button } from 'flowbite-svelte';

  // Bindings
  export let provider = 'google';

  async function handleClick() {
    if ($session.user) {
      await auth.signOut();
    } else {
      await auth.signInWith(provider);
    }
  }
</script>

<Button color="primary" on:click={handleClick}>
  {#if $session.user}
    Sign out
  {:else}
    Sign in
  {/if}
</Button>

<style>
</style>
