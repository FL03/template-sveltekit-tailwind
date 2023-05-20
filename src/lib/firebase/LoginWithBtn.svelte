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

<Button color="dark" pill on:click={handleClick}>
  {#if $session.user}
    Sign out
  {:else}
    <slot>
      <i class="ion-social-{provider}" />
      Sign in with {provider}
    </slot>
  {/if}
</Button>

<style>
</style>
