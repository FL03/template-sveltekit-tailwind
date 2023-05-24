<script lang="ts">
  import { Timeline, TimelineItem } from 'flowbite-svelte';

  import PostPreview from './PostPreview.svelte';

  export let articles: import('$lib').Post[] = [];
  export let user: import('$lib').User;
</script>

{#if articles.length === 0}
  <div class="article-preview">No articles are here... yet.</div>
{:else if articles.length > 0 && user}
  {#each articles as article (article.slug)}
    <Timeline order="vertical">
      <TimelineItem date={article.createdAt.toDate().toDateString()} title={article.title}>
        <PostPreview {article} {user} />
      </TimelineItem>
    </Timeline>
  {/each}
{/if}

<style>
</style>
