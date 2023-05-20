<script>
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';

  export let company = 'Puzzled';
  export let year = new Date().getFullYear();
</script>

<Footer class="sticky bottom-0 left-0 z-20 w-full">
  <FooterCopyright href="/" by="{company}™" {year} />
  <FooterLinkGroup
    ulClass="flex flex-wrap items-center mt-3 text-sm prose dark:prose-invertsm:mt-0"
  >
    <FooterLink href="/about">About</FooterLink>
  </FooterLinkGroup>
</Footer>

<style>
</style>
