<script lang="ts">
  import CommentInput from './CommentInput.svelte';
  import Comment from './Comment.svelte';

  export let comments: import('$lib/models/comments').Comment[];
  export let user: import('$lib/types').User;
</script>

<div class="col-xs-12 col-md-8 offset-md-2">
  {#if user}
    <div>
      <CommentInput {user} />
    </div>
  {:else}
    <p>
      <a href="/login">Sign in</a>
      or
      <a href="/register">sign up</a>
      to add comments on this article.
    </p>
  {/if}

  {#each comments as comment (comment.id)}
    <Comment {comment} {user} />
  {/each}
</div>
