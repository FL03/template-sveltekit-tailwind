<script lang="ts">
  import { enhance } from '$app/forms';

  export let article: import('$lib/models').Post;
  export let user: import('$lib/types').User;
</script>

<div class="article-meta">
  <a href="/profile/@{article.author.uid}">
    <img src={article.author.picture} alt="#" />
  </a>

  <div class="info">
    <a href="/profile/@{article.author.uid}" class="author">{article.author.name}</a>
    <span class="date">
      {article.createdAt}
    </span>
  </div>

  {#if article.author.username === user?.username}
    <span>
      <a href="/editor/{article.slug}" class="btn btn-outline-secondary btn-sm">
        <i class="ion-edit" /> Edit Article
      </a>

      <form use:enhance method="POST" action="?/deleteArticle">
        <button class="btn btn-outline-danger btn-sm">
          <i class="ion-trash-a" /> Delete Article
        </button>
      </form>
    </span>
  {/if}
</div>
