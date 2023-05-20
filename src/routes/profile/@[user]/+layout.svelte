<script>
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  import {
    Avatar,
    Button,
    Card,
    Checkbox,
    Dropdown,
    DropdownItem,
    MenuButton
  } from 'flowbite-svelte';

  // Bindings
  let horizontal = false;

  /** @type {import('./$types').PageData} */
  export let data;

  // Data
  const { profile, session } = data;

  const user = session.user;
  $: is_favorites = $page.route.id === '/profile/@[user]/favorites';
  onMount(async () => {});
</script>

<svelte:head>
  <title>{profile.username || profile.name} • Profile</title>
</svelte:head>

<Card {horizontal}>
  <div class="flex justify-end">
    <MenuButton />
    <Dropdown class="w-36">
      <DropdownItem>Edit</DropdownItem>
      <DropdownItem>Export data</DropdownItem>
      <DropdownItem>Delete</DropdownItem>
    </Dropdown>
  </div>
  <div class="flex flex-col items-center pb-4">
    <Avatar size="lg" src={profile.picture} />
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{profile.name}</h5>
    {#if profile.bio}
      <span class="text-sm text-gray-500 dark:text-gray-400">{profile.bio}</span>
    {/if}

    {#if profile.uid === user?.uid}
      <a href="/settings" class="btn btn-sm btn-outline-secondary action-btn">
        <i class="ion-gear-a" />
        Settings
      </a>
    {:else if user}
      <form
        method="POST"
        action="/profile/@{profile.uid}?/toggleFollow"
        use:enhance={({ form }) => {
          // optimistic UI
          profile.following = !profile.following;

          const button = form.querySelector('button');
          button.disabled = true;

          return ({ result, update }) => {
            button.disabled = false;
            if (result.type === 'error') update();
          };
        }}
      >
        <input hidden type="checkbox" name="following" checked={profile.following} />
        <Button>
          <i class="ion-plus-round" />
          {profile.following ? 'Unfollow' : 'Follow'}
          {profile.username}
        </Button>
      </form>
      <div class="flex mt-4 space-x-3 lg:mt-6">
        <Button>Add friend</Button>
        <Button color="light" class="dark:text-white">Message</Button>
      </div>
    {:else}
      <a href="/login">Sign in to follow</a>
    {/if}
  </div>
</Card>

<div class="articles-toggle">
  <ul class="nav nav-pills outline-active">
    <li class="nav-item">
      <a href="/profile/@{profile.uid}" class="nav-link" class:active={!is_favorites}> Articles </a>
    </li>

    <li class="nav-item">
      <a href="/profile/@{profile.uid}/favorites" class="nav-link" class:active={is_favorites}>
        Favorites
      </a>
    </li>
  </ul>
</div>

<section class="py-2 w-full items-center justify-center">
  <slot />
</section>
