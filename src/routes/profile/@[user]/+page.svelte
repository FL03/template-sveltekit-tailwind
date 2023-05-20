<script>
  import { page } from '$app/stores';
  import PostTimeline from '$lib/cmp/posts/PostTimeline.svelte';
  import { Tabs, TabItem } from 'flowbite-svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  $: user = $page.data.session.user;
</script>

{#if user}
  <Tabs
    style="full"
    defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
  >
    <TabItem class="w-full" open>
      <span slot="title">Feed</span>
      <div class="mx-auto px-1.5">
        <PostTimeline articles={data.articles} {user}/>
      </div>
    </TabItem>
    <TabItem class="w-full">
      <span slot="title">History</span>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Dashboard:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
  </Tabs>
{/if}