
export let map;


function initMap(container) {
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
