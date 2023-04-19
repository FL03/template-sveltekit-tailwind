
export let map;


async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -25.344, lng: 131.031 },
    mapId: "DEMO_MAP_ID",
    zoom: 4,
  });

  // The marker, positioned at Uluru
  const marker = new google.maps.marker.AdvancedMarkerView({
    map: map,
    position: position,
    title: "Uluru",
  });
}

export { initMap };
