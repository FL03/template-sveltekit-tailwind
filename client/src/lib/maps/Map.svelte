<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
        
    import { initMap } from './maps.js';

    export let ready = false;
    export let width = 600;
    export let height = 450;

    const dispatch = createEventDispatcher();
    
    let map;
    let container;
    let zoom = 4;
    
    onMount(async () => {
        Object.assign(window, {
            mapLoaded: () => {
                // @ts-ignore
                map = new google.maps.Map(container, {
                    zoom,
                    center
                    // styles: mapStyles
                });
                dispatch('load', true);
                if (globally) {
                    Object.assign(window, { map });
                }
            }
        });
	});
</script>

<svelte:head>
	<script defer async src="https://maps.googleapis.com/maps/api/js?key={process.env.GOOGLE_MAPS_API_KEY}&callback=mapLoaded"></script>
</svelte:head>


<div id="map" style="width: {width}px; height: {height}px;" bind:this={container}></div>

<style>

</style>