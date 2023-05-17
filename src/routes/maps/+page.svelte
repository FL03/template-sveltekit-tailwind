<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { onMount } from 'svelte';

  import { Map, styles } from '@svkcl/google-maps';
  import { Button, ButtonGroup } from 'flowbite-svelte';
  import { getPoints, heatmapGradients } from '$lib/heatmap.ts';

  import {
    Input,
    Range,
    Toggle,
    Toolbar,
    ToolbarButton,
    ToolbarGroup,
    Tooltip
  } from 'flowbite-svelte';

  // Values
  let opacity: number = 0.2;
  let query: string = 'San Francisco';
  let radius: number = 3;
  // Bindings
  let map: google.maps.Map;
  let infowindow: google.maps.InfoWindow;
  let heatmap: google.maps.visualization.HeatmapLayer;
  let service: google.maps.places.PlacesService;

  function changeGradient(): void {
    heatmap.set('gradient', heatmap.get('gradient') ? null : heatmapGradients);
  }

  function adjustRadius(): void {
    heatmap.set('radius', radius);
  }

  function createMarker(place: google.maps.places.PlaceResult) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent(place.name || '');
      infowindow.open(map);
    });
  }

  function searchMap(req: string) {
    var request = { query: req, fields: ['name', 'geometry'] };
    service.findPlaceFromQuery(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        if (results[0].geometry?.location) {
          map.setCenter(results[0].geometry.location);
          infowindow.setPosition(results[0].geometry.location);
          inforwindow.getContent();
        }
      }
    });
  }

  onMount(() => {
    infowindow = new google.maps.InfoWindow();
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: getPoints(),
      map,
      radius
    });
    service = new google.maps.places.PlacesService(map);
  });
</script>

<Map
  mapId={env.PUBLIC_GOOGLE_MAPS_ID}
  styles={styles.darkModeMapStyle}
  bind:map
  --min-height="75vh"
  --min-width="100%"
/>

<Toolbar>
  <ToolbarGroup>
    <Toggle checked color="blue" on:click={() => heatmap.setMap(heatmap.getMap() ? null : map)}
      >Heatmap</Toggle
    >
  </ToolbarGroup>
  <ToolbarGroup>
    <Range bind:value={radius} min={0} max={50} on:change={adjustRadius} />
    <Tooltip arrow={false}>Update the radius of the entries</Tooltip>
    <ToolbarButton
      on:click={() => heatmap.set('gradient', heatmap.get('gradient') ? null : heatmapGradients)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
        />
      </svg>
      <Tooltip arrow={false}>Change the gradient</Tooltip>
    </ToolbarButton>
    <ToolbarButton on:click={() => heatmap.set('opacity', heatmap.get('opacity') ? null : opacity)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
      <Tooltip arrow={false}>Change the opacity</Tooltip>
    </ToolbarButton>
  </ToolbarGroup>
  <ToolbarGroup>
    <input
      class="border border-gray-300 rounded-md p-2"
      id="search"
      placeholder="Search for a place"
      bind:value={query}
      on:keydown={(e) => e.key === 'Enter' && searchMap(query)}
    />
    <ToolbarButton on:click={() => searchMap(query)}>
      <svg
        aria-hidden="true"
        class="w-6 h-6 text-gray-500 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        /></svg
      >
    </ToolbarButton>
  </ToolbarGroup>
</Toolbar>

<style>
</style>
