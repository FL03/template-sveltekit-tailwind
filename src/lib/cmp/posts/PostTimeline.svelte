<script lang="ts">
  import { page } from '$app/stores';
  import { Timeline, TimelineItem } from 'flowbite-svelte';

  import PostPreview from './PostPreview.svelte';

  export let articles: import('$lib/models').Post[] = [];
</script>

{#if articles.length === 0}
  <div class="article-preview">No articles are here... yet.</div>
{:else if articles.length > 0 && $page.data.session.user}
  {#each articles as article (article.slug)}
    <Timeline order="vertical">
      <TimelineItem title={article.title} date={article.createdAt.toString()}>
        <PostPreview {article} user={$page.data.session.user} />
      </TimelineItem>
    </Timeline>
  {/each}
{/if}

<style>
</style>
