<script>
	import '$lib/assets/css/styles.css';

	import * as dotenv from 'dotenv';
	dotenv.config();
	import FirebaseApp from '$lib/firebase/FirebaseApp.svelte';
	import { db as firestore, auth } from '$lib/firebase/firebase';
</script>

<FirebaseApp>
	<div class="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex flex-col items-center justify-center m-0 p-0 z-0 min-h-screen min-w-full max-w-screen" id="base">
		<slot/>
	</div>
</FirebaseApp>

<style>
	
</style>
