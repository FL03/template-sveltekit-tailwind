<script lang="ts">
  import { page } from '$app/stores';
  import PostTimeline from '$lib/cmp/posts/PostTimeline.svelte';
  import { page_size } from '$lib';
  import { firestore, session } from '$lib/firebase/stores';
  import { getPosts } from '$lib/firebase';
  import type { Post } from '$lib/models/posts';
  import type { User } from '$lib/types/users';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { onMount } from 'svelte';

  let articles: Post[] | undefined;
  let pages: number;
  let profile: User | undefined;

  $: user = $session.user;

  onMount(async () => {
    const pdoc = await firestore.getDocument(`users/${$page.params.user}`);
    articles = await getPosts($page.params.user);
    pages = Math.ceil(articles.length / page_size);
    profile = { ...pdoc.data(), email: pdoc.data()?.email, uid: pdoc.id, name: pdoc.data()?.name };
  });
</script>

{#if user}
  <Tabs
    style="full"
    defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
  >
    <TabItem class="w-full" open>
      <span slot="title">Feed</span>
      <div class="mx-auto px-1.5">
        <PostTimeline {articles} {user} />
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
