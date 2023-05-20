<script>
  import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { page_size } from '$lib/constants';
  import { firestore } from '$lib/firebase/stores';

  /** @type {import('$lib/models/posts').Post[]}*/
  let articles = [];
  let pages = 0;

  onMount(async () => {
    const favorites = await firestore.getDocuments(`users/${$page.params.user}/favorites`);
    articles = favorites.docs.map(doc => ({...doc.data()}));
    pages = Math.ceil(articles.length / page_size);
  })
</script>