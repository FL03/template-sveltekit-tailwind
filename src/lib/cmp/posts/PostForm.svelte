<script lang="ts">
  import { enhance } from '$app/forms';
  import { flip } from 'svelte/animate';
  import { scale } from 'svelte/transition';

  import { Button, Checkbox, Label, Input, Textarea } from 'flowbite-svelte';
  import { Post } from '$lib/models/posts';
  import { firestore } from '$lib/firebase/stores';

  export let user: import('$lib/types').User;
  export let article: Post = new Post(user);
  async function handleSubmit() {
    await firestore.create(`posts`, { ...article });
  }
</script>

<form class="bg-inherit" use:enhance method="POST">
  <Input name="title" placeholder="Title" bind:value={article.title} />
  <Input
    name="description"
    placeholder="What's this article about?"
    bind:value={article.description}
  />
  <Textarea
    name="body"
    rows="8"
    placeholder="Write your article (in markdown)"
    bind:value={article.body}
  />

  <Input
    placeholder="Enter tags"
    on:keydown={(event) => {
      if (event.key === 'Enter' && event.target) {
        event.preventDefault();
        if (!article.tags.includes(event.target.value)) {
          article.tags = [...article.tags, event.target.value];
        }

        event.target.value = '';
      }
    }}
  />

  <div class="tag-list divide-y">
    {#each article.tags as tag, i (tag)}
      <button
        transition:scale|local={{ duration: 200 }}
        animate:flip={{ duration: 200 }}
        class="tag-default tag-pill"
        on:click|preventDefault={() => {
          article.tags = [...article.tags.slice(0, i), ...article.tags.slice(i + 1)];
        }}
        aria-label="Remove {tag} tag"
      >
        <i class="ion-close-round" />
        {tag}
      </button>
    {/each}
  </div>

  {#each article.tags as tag}
    <Input hidden name="tag" bind:value={tag} />
  {/each}

  <button type="submit" on:click|preventDefault={handleSubmit}>Publish</button>
</form>

<style>
  .tag-pill {
    border: none;
  }
</style>
