// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
  namespace App {
    interface Error {}
    interface Locals {
      firebase: import('firebase/auth').User | null;
      user: import('$lib/types').User | null;
    }
    interface PageData {
      session: import('$lib/types').Session;
      user: import('firebase/auth').User | null;
    }
    interface Platform {}
  }
  namespace svelteHTML {
    interface HTMLAttributes {
      'on:clickoutside'?: (event: CustomEvent) => void;
    }
  }
}

export {};
