<script lang="ts">
  import { Card, Heading, Tabs, TabItem } from 'flowbite-svelte';
  let user: any = {
    name: 'John Doe',
    email: ''
  };
</script>

<svelte:head>
  <title>Profile - {user.name}</title>
</svelte:head>

<Card>
  <Heading class="text-2xl">Profile</Heading>
  <p>Name: {user.name}</p>
  <p>Email: {user.email}</p>
</Card>

<Tabs
  style="full"
  defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700 py-1.5"
>
  <TabItem class="w-full">
    <span slot="title">Following</span>
  </TabItem>
  <TabItem class="w-full">
    <span slot="title">History</span>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua.
    </p>
  </TabItem>
  <TabItem class="w-full" open>
    <span slot="title">Posts</span>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua.
    </p>
  </TabItem>
  <TabItem class="w-full">
    <span slot="title">Preferences</span>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Settings:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua.
    </p>
  </TabItem>
</Tabs>

<style>
</style>
