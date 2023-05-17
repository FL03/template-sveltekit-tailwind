<script>
  import PostTimeline from '$lib/cmp/posts/PostTimeline.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<svelte:head>
  <title>Feed</title>
</svelte:head>

<PostTimeline articles={data.articles} />

<style>
</style>
