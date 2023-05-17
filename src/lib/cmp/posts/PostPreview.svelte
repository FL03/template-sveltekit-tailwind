<script lang="ts">
  import { enhance } from '$app/forms';

  import { Card, Checkbox } from 'flowbite-svelte';

  export let article: import('$lib/models').Post | import('firebase/firestore').DocumentData;
  export let user: import('$lib/types').User;

  let hCard = false;
</script>

<Card horizontal reverse={hCard}>
  <div class="article-meta">
    <a href="/profile/@{article.author.uid}">
      <img src={article.author.picture} alt={article.author.uid} />
    </a>

    <div class="info">
      <a class="author" href="/profile/@{article.author.uid}">{article.author.username}</a>
      <span class="date">{article.createdAt}</span>
    </div>

    {#if user}
      <form
        method="POST"
        action="/feed/{article.slug}?/toggleFavorite"
        use:enhance={({ form }) => {
          // optimistic UI
          if (article.favorited) {
            article.favorited = false;
            article.favoritesCount -= 1;
          } else {
            article.favorited = true;
            article.favoritesCount += 1;
          }

          const button = form.querySelector('button');
          if (!button) return;

          button.disabled = true;

          return ({ result, update }) => {
            button.disabled = false;
            if (result.type === 'error') update();
          };
        }}
        class="pull-xs-right"
      >
        <Checkbox hidden name="favorited" checked={article.favorited} />
        <button class="btn btn-sm {article.favorited ? 'btn-primary' : 'btn-outline-primary'}">
          <i class="ion-heart" />
          {article.favoritesCount}
        </button>
      </form>
    {/if}
  </div>

  <a href="/feed/{article.slug}" class="preview-link">
    <h1>{article.title}</h1>
    <p>{article.description}</p>
    <span>Read more...</span>
    <ul class="tag-list">
      {#each article.tags as tag}
        <li class="tag-default tag-pill tag-outline"><a href="/?tag={tag}">{tag}</a></li>
      {/each}
    </ul>
  </a>
</Card>

<style></style>
