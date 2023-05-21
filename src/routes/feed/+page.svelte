<script>
  import PostTimeline from '$lib/cmp/posts/PostTimeline.svelte';
  import { session } from '$lib/firebase/stores';

  /** @type {import('./$types').PageData} */
  export let data;
  $: user = $session.user;
</script>

<svelte:head>
  <title>Feed</title>
</svelte:head>

{#if user}
  <PostTimeline articles={data.articles} {user} />
{/if}

<style>
</style>
