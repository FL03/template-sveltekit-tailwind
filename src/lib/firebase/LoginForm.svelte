<script>
  import { enhance } from '$app/forms';
  import LoginWithBtn from '$lib/firebase/LoginWithBtn.svelte';

  let email = '';
  let password = '';
</script>

<form class="p-3 prose rounded" method="POST" use:enhance>
  <input
    class="flex px-3 py-2 rounded shadow-lg my-3"
    placeholder="email"
    type="email"
    value={email}
  />
  <input
    class="flex px-3 py-2 rounded shadow-lg my-3"
    placeholder="Password"
    type="password"
    value={password}
  />
  <div>
    <LoginWithBtn provider="google" />
  </div>
  <div class="flex px-3 py-2 rounded shadow-lg my-3">
    <input type="checkbox" id="remember" name="remember" value="remember" />
    <label for="remember">Remember me</label>
  </div>
  <div class="divide-x">
    <button on:click={() => {}}> Login </button>
  </div>
</form>

<style>
  button {
    align-items: center;
    display: inline-block;
    justify-content: center;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.5rem 0.75rem;
    width: max-content;
  }
</style>
