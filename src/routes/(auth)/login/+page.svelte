<script>
  import { enhance } from '$app/forms';
  import ErrorList from '$lib/cmp/errors/ErrorList.svelte';
  import LoginWithBtn from '$lib/firebase/LoginWithBtn.svelte';
  import { Button, Card, Checkbox, Input, Label } from 'flowbite-svelte';

  let email = '';
  let password = '';
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<svelte:head>
  <title>Sign in</title>
</svelte:head>

<ErrorList errors={form?.errors} />

<Card>
	<form class="flex flex-col space-y-6 min-w-md min-h-md" action="/" method="POST" use:enhance>
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input name="email" placeholder="name@company.com" type="email" required />
		</Label>
		<Label class="space-y-2">
			<span>Your password</span>
			<Input name="password" placeholder="•••••" type="password" required />
		</Label>
    <div class="flex items-start divide-y">
      <LoginWithBtn provider="google">Google</LoginWithBtn>
    </div>
		<div class="flex items-start">
				<Checkbox>Remember me</Checkbox>
				<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost password?</a>
		</div>
		<Button type="submit" class="w-full">Login to your account</Button>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <a href="/" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
			</div>
	</form>
</Card>
