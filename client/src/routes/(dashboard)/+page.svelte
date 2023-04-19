<script>
    import Map from "$lib/maps";

    
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Landing" />
</svelte:head>

<div class="flex flex-col">
    <h1 class="flex prose prose-invert prose-2xl">Puzzled</h1>
    
    <span class="flex prose prose-invert py-3">
        Welcome to Puzzled, a platform where puzzles come to life!
    </span>
    <span>
        <Map/>
    </span>
</div>
