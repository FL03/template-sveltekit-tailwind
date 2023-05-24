<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { PostTimeline, postConverter } from '$lib';
  import { firestore } from '$lib/firebase';
  import { orderBy, query } from 'firebase/firestore';

  let articles: import('$lib').Post[] = [];

  $: user = $page.data.session.user;
  onMount(async () => {
    let q = await firestore.query(`posts`);
    q = query(q, orderBy('createdAt', 'desc'));
    const snapshot = await firestore.getDocuments(q);
    articles = snapshot.docs.map((doc) => postConverter.fromFirestore(doc, {}));
  });
</script>

<svelte:head>
  <title>Feed</title>
</svelte:head>

{#if user}
  <PostTimeline {articles} {user} />
{/if}

<style>
</style>
