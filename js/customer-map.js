/* ============================================================
   CUSTOMER MAP
   Loads data/customer-locations.built.json (generated at build
   time from /admin's simple city/state entries) and plots
   city-level pins on a Leaflet map. Only city + state are ever
   shown — no names, addresses, or sale details.
   ============================================================ */

const CUSTOMER_MAP_CENTER = [35.5951, -82.5515]; // Asheville, NC
const CUSTOMER_MAP_ZOOM = 7;

function renderCustomerMap() {
  const mapEl = document.getElementById("customerMap");
  if (!mapEl) return;

  fetch("data/customer-locations.built.json")
    .then(r => r.json())
    .then(data => {
      const locations = (data && data.locations) || [];

      const map = L.map(mapEl, {
        center: CUSTOMER_MAP_CENTER,
        zoom: CUSTOMER_MAP_ZOOM - 2,
        minZoom: 4,
        maxZoom: 12,
        scrollWheelZoom: true,
        zoomSnap: 0.25,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 120,
        fadeAnimation: true,
        markerZoomAnimation: true
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20
      }).addTo(map);

      locations.forEach(loc => {
        if (typeof loc.lat !== "number" || typeof loc.lng !== "number") return;
        const marker = L.circleMarker([loc.lat, loc.lng], {
          className: "customer-pin",
          radius: 7,
          weight: 1.5,
          color: "#FF8F4D",
          opacity: 0.85,
          fillColor: "#FF6B1F",
          fillOpacity: 0.55
        }).addTo(map);
        marker.bindPopup(`<strong>${loc.city}, ${loc.state}</strong>`);
        marker.on("click", () => {
          const el = marker.getElement();
          if (!el) return;
          el.classList.remove("is-tapped");
          void el.offsetWidth; // restart animation if tapped again quickly
          el.classList.add("is-tapped");
        });
      });

      document.getElementById("customerMapEmpty").style.display = locations.length ? "none" : "block";

      // Subtle ease-in: settle from a wider view into the default center/zoom.
      setTimeout(() => {
        map.flyTo(CUSTOMER_MAP_CENTER, CUSTOMER_MAP_ZOOM, { duration: 1.6, easeLinearity: 0.25 });
      }, 200);
    })
    .catch(err => {
      console.error("Failed to load customer locations:", err);
    });
}
