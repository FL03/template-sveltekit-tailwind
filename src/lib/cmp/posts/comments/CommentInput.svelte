<script lang="ts">
  import { enhance } from '$app/forms';

  let placeholder = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  export let user;
</script>

<form use:enhance method="POST" action="?/createComment" class="card comment-form">
  <div class="card-block">
    <textarea class="form-control" name="comment" placeholder="Write a comment..." rows="3" />
  </div>

  <div class="card-footer">
    <img src={user.image || placeholder} class="comment-author-img" alt={user.username} />
    <button class="btn btn-sm btn-primary" type="submit">Post Comment</button>
  </div>
</form>
