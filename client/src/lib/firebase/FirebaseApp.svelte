<script lang="ts">
    import { type Auth } from 'firebase/auth';
    import { type Firestore } from 'firebase/firestore';
    import { sdk } from './store';

    /** @param {Firestore} firestore */
    export let firestore: Firestore;
    /** @param {Auth} auth */
    export let auth: Auth;
    sdk.set({ firestore, auth });
</script>


<slot />