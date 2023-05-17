<script>
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { enhance } from '$app/forms';
  import ErrorList from '$lib/cmp/errors/ErrorList.svelte';
  import PostForm from '$lib/cmp/posts/PostForm.svelte';
  export let article;
  export let errors;
</script>

<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <ErrorList {errors} />

        <PostForm {article} />
      </div>
    </div>
  </div>
</div>

<style>
</style>
