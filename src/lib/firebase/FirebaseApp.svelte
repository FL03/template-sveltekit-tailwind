<script lang="ts">
    import { type Auth } from 'firebase/auth';
    import { sdk } from './store';

    export let auth: Auth;
    
    sdk.set({ auth });
</script>


<slot />