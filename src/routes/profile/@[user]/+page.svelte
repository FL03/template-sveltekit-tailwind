<script>
  import PostList from '$lib/cmp/posts/PostList.svelte';

  /** @type {import('@sveltejs/kit').PageData} */
  export let data;
</script>

<PostList articles={data.articles} />
