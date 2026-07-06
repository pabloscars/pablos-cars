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
        zoom: CUSTOMER_MAP_ZOOM - 1.5,
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

      fetch("data/us-states-southeast.geojson")
        .then(r => r.json())
        .then(statesGeoJson => {
          L.geoJSON(statesGeoJson, {
            style: {
              color: "#B8B6AE",
              weight: 1.6,
              opacity: 0.45,
              fill: false
            },
            interactive: false
          }).addTo(map);
        })
        .catch(err => console.error("Failed to load state outlines:", err));

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
        marker.bindTooltip(`${loc.city}, ${loc.state}`, { direction: "top", offset: [0, -8], className: "map-tooltip" });
        marker.on("click", () => {
          const el = marker.getElement();
          if (!el) return;
          el.classList.remove("is-tapped");
          void el.offsetWidth; // restart animation if tapped again quickly
          el.classList.add("is-tapped");
        });
      });

      // Home base marker — the shop's own location, styled as the map's focal point
      // (a plain garage outline, no background bubble).
      const homeIcon = L.divIcon({
        className: "map-home-icon",
        html: `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21V10L12 3l10 7v11"/><rect x="5" y="12" width="14" height="9"/><line x1="5" y1="15.5" x2="19" y2="15.5"/><line x1="5" y1="18" x2="19" y2="18"/></svg>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });
      L.marker(CUSTOMER_MAP_CENTER, { icon: homeIcon, interactive: false, zIndexOffset: 1000 }).addTo(map);

      document.getElementById("customerMapEmpty").style.display = locations.length ? "none" : "block";

      // Smooth ease-in: settle from a wider view into the default center/zoom.
      setTimeout(() => {
        map.flyTo(CUSTOMER_MAP_CENTER, CUSTOMER_MAP_ZOOM, { duration: 2.4, easeLinearity: 0.12 });
      }, 200);
    })
    .catch(err => {
      console.error("Failed to load customer locations:", err);
    });
}
