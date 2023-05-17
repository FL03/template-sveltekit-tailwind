<script lang="ts">
  import { page } from '$app/stores';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import { Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
  import { Avatar, DarkMode } from 'flowbite-svelte';

  export let banner: string = 'Template';
  export let logo = 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600';

  function handleClick() {

  }
</script>

<Navbar
  navClass="px-2 sm:px-4 py-1.5 sticky w-full z-50 top-0 left-0"
  fluid
  color="none"
  let:hidden
  let:toggle
>
  <NavBrand href="/">
    <img src={logo} class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:prose-invert"
      >{banner}</span
    >
  </NavBrand>
  <!-- Links -->
  <NavUl {hidden}>
    <NavLi href="/about">About</NavLi>
  </NavUl>
  <!-- Gutter -->
  <div class="flex items-center md:order-2 ml-auto">
    <DarkMode class="text-lg">
      <svelte:fragment slot="lightIcon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
          ><path
            fill="currentColor"
            d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
          /></svg
        >
      </svelte:fragment>
      <svelte:fragment slot="darkIcon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
          ><path
            fill="currentColor"
            d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"
          /></svg
        >
      </svelte:fragment>
    </DarkMode>
    <Avatar id="avatar-menu" src="/icons/profile.svg" />
    <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    {#if $page.data.user}
      <DropdownHeader>
        <span class="block text-sm">{$page.data.user.username}</span>
        <span class="block truncate text-sm font-medium">{$page.data.user.email}</span>
      </DropdownHeader>
      <DropdownItem href="/profile">Profile</DropdownItem>
      <DropdownItem href="/settings">Settings</DropdownItem>
    {/if}
    <DropdownDivider />
    {#if $page.data.user}
      <DropdownItem>Sign out</DropdownItem>
    {:else}
      <DropdownItem href="/login">Sign in</DropdownItem>
      <DropdownItem href="/register">Sign up</DropdownItem>
    {/if}
  </Dropdown>
</Navbar>
