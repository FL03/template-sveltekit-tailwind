<script>
  import { Button, Card, Tabs, TabItem } from 'flowbite-svelte';
  let count = 0;
</script>

<Tabs
  style="full"
  defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700 pb-3"
>
  <TabItem class="w-full" open>
    <span slot="title">Feed</span>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua.
    </p>
  </TabItem>
  <TabItem class="w-full">
    <span slot="title">Messages</span>
    <Card class="prose dark:prose-invert bg-transparent">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
        chronological order.
      </p>
      <Button class="w-fit" on:click={() => (count += 1)}>
        {count === 0 ? 'Click me' : `You clicked me ${count} times`}
      </Button>
    </Card>
  </TabItem>
  <TabItem class="w-full">
    <span slot="title">History</span>
  </TabItem>
  <TabItem class="w-full">
    <span slot="title">Friends</span>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua.
    </p>
  </TabItem>
</Tabs>
