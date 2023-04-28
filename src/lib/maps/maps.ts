/** 
 * 
 */

export let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat: 40.730610, lng: -73.935242 },
    zoom: 12,
  });
}

declare global {
    interface Window {
        initMap: () => void;
    }
}

window.initMap = initMap;

export { initMap };