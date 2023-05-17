<script>
  import { enhance } from '$app/forms';
  import ErrorList from '$lib/cmp/errors/ErrorList.svelte';
  import LoginWithBtn from '$lib/firebase/LoginWithBtn.svelte';
  import { Button, Input } from 'flowbite-svelte';

  let email = '';
  let password = '';
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<svelte:head>
  <title>Sign in</title>
</svelte:head>

<h1 class="text-xs-center">Sign In</h1>


<ErrorList errors={form?.errors} />

<form use:enhance method="POST">
  <Input
    name="email"
    placeholder="Email"
    type="email"
    bind:value={email}
  />
  <Input
    name="password"
    placeholder="Password"
    type="password"
    bind:value={password}
  />
  <div class="w-full divide-y">
    <LoginWithBtn provider="google" />
  </div>
  <Button type="submit">
    Login
  </Button>
</form>

<p class="text-xs-center">
  <a href="/register">Need an account?</a>
</p>
