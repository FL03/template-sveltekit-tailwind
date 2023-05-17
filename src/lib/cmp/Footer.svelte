<script lang="ts">
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
</script>

<Footer class="absolute bottom-0 left-0 z-20 w-full">
  <FooterCopyright href="/" by="Gambit™" year={2023} />
  <FooterLinkGroup
    ulClass="flex flex-wrap items-center mt-3 text-sm prose dark:prose-invertsm:mt-0"
  >
    <FooterLink href="/about">About</FooterLink>
  </FooterLinkGroup>
</Footer>

<style>
</style>
