/* ============================================================
   CUSTOMER MAP
   Loads data/customer-locations.json (edited via /admin) and
   plots city-level pins on a Leaflet map. Only city + state are
   ever shown — no names, addresses, or sale details.
   ============================================================ */

const CUSTOMER_MAP_CENTER = [35.5951, -82.5515]; // Asheville, NC
const CUSTOMER_MAP_ZOOM = 6;

function renderCustomerMap() {
  const mapEl = document.getElementById("customerMap");
  if (!mapEl) return;

  fetch("data/customer-locations.built.json")
    .then(r => r.json())
    .then(data => {
      const locations = (data && data.locations) || [];

      const map = L.map(mapEl, {
        center: CUSTOMER_MAP_CENTER,
        zoom: CUSTOMER_MAP_ZOOM,
        minZoom: 4,
        maxZoom: 12,
        scrollWheelZoom: true
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20
      }).addTo(map);

      locations.forEach(loc => {
        if (typeof loc.lat !== "number" || typeof loc.lng !== "number") return;
        const marker = L.circleMarker([loc.lat, loc.lng], {
          radius: 9,
          weight: 2,
          color: "#FF8F4D",
          fillColor: "#FF6B1F",
          fillOpacity: 0.9
        }).addTo(map);
        marker.bindPopup(`<strong>${loc.city}, ${loc.state}</strong>`);
      });

      document.getElementById("customerMapEmpty").style.display = locations.length ? "none" : "block";
    })
    .catch(err => {
      console.error("Failed to load customer locations:", err);
    });
}
