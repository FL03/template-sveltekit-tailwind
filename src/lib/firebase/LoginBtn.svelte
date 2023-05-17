<script lang="ts">
  import { auth, session } from '$lib/firebase/stores';

  let props: string =
    'bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-900 prose prose-invert rounded drop-shadow shadow-lg';

  export { props as class };
</script>

<!-- using the session state avoids the initial delay while the client auth resolves -->
{#if $session.user}
  <button class={props} id="login-btn" on:click={auth.signOut}>
    Sign Out
  </button>
{:else}
  <a class={props} href="/login" id="login-btn" type="button">
    <slot>Login &rarr</slot>
  </a>
{/if}

<style>
  #login-btn {
    align-items: center;
    display: inline-block;
    justify-content: center;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.5rem 0.75rem;
    width: max-content;
  }
</style>
