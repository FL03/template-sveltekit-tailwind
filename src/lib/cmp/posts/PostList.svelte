<script lang="ts">
  import { page } from '$app/stores';
  import {} from 'flowbite-svelte';

  import PostPreview from './PostPreview.svelte';

  export let articles: import('$lib/models').Post[] = [];
</script>

{#if articles.length === 0}
  <div class="article-preview">No articles are here... yet.</div>
{:else}
  <div>
    {#each articles as article (article.slug)}
      <PostPreview {article} user={$page.data.user} />
    {/each}
  </div>
{/if}

<style>
</style>
