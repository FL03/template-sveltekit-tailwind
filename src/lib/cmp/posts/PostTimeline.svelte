<script lang="ts">
  import { Timeline, TimelineItem } from 'flowbite-svelte';

  import PostPreview from './PostPreview.svelte';

  export let articles: import('$lib/models').Post[] = [];
  export let user: import('$lib/types').User;
</script>

{#if articles.length === 0}
  <div class="article-preview">No articles are here... yet.</div>
{:else if articles.length > 0 && user}
  {#each articles as article (article.slug)}
    <Timeline order="vertical">
      <TimelineItem title={article.title} date={article.createdAt.toString()}>
        <PostPreview {article} {user} />
      </TimelineItem>
    </Timeline>
  {/each}
{/if}

<style>
</style>
