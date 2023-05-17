<script lang="ts">
  import ErrorList from '$lib/cmp/errors/ErrorList.svelte';
  import PostForm from './PostForm.svelte';

  export let user: import('$lib/types').User;
  export let errors: any[] = [];
</script>

<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <ErrorList {errors} />

        <PostForm {user} />
      </div>
    </div>
  </div>
</div>

<style>
</style>
