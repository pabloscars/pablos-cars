/* ============================================================
   CUSTOMER MAP
   Loads data/customer-locations.built.json (generated at build
   time from /admin's simple city/state entries) and plots
   city-level pins on a Leaflet map. Only city + state are ever
   shown — no names, addresses, or sale details.
   ============================================================ */

const CUSTOMER_MAP_CENTER = [35.5951, -82.5515]; // Asheville, NC
const CUSTOMER_MAP_ZOOM = 7;

const STATE_NAMES = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",
  CT:"Connecticut",DE:"Delaware",DC:"District of Columbia",FL:"Florida",GA:"Georgia",
  HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",
  LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",
  MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",
  NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",
  OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",
  SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",
  WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"
};

/* Turns a state's GeoJSON geometry into a tiny SVG silhouette of that
   state, normalized to a small square and corrected for longitude
   compression at the state's latitude so the shape isn't stretched. */
function stateShapeSVG(feature, size) {
  size = size || 26;
  const geom = feature.geometry;
  const polys = geom.type === "MultiPolygon" ? geom.coordinates : [geom.coordinates];
  const rings = [];
  polys.forEach(poly => poly.forEach(ring => rings.push(ring)));

  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  rings.forEach(r => r.forEach(([lng, lat]) => {
    if (lng < minLng) minLng = lng; if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat; if (lat > maxLat) maxLat = lat;
  }));

  const k = Math.cos(((minLat + maxLat) / 2) * Math.PI / 180); // lng->distance correction
  const gW = (maxLng - minLng) * k, gH = (maxLat - minLat);
  const pad = 1.2;
  const scale = (size - pad * 2) / Math.max(gW, gH);
  const w = gW * scale + pad * 2, h = gH * scale + pad * 2;
  const X = lng => (pad + (lng - minLng) * k * scale).toFixed(1);
  const Y = lat => (pad + (maxLat - lat) * scale).toFixed(1);
  const d = rings.map(r => "M" + r.map(([lng, lat]) => X(lng) + " " + Y(lat)).join("L") + "Z").join("");

  return `<svg class="state-shape" viewBox="0 0 ${w.toFixed(1)} ${h.toFixed(1)}" aria-hidden="true"><path d="${d}"/></svg>`;
}

/* Summary stats + a per-state tally of every state reached (ranked),
   shown above the map. Only states with sales appear, so it reads as
   intentional now and fills out on its own as the map grows. Each chip
   carries a little silhouette of the actual state. */
function renderCustomerMapStats(locations) {
  const el = document.getElementById("customerMapStats");
  if (!el) return;
  if (!locations.length) { el.innerHTML = ""; return; }

  const byState = {};
  const cityTally = {}; // { STATE: { City: count } }
  locations.forEach(l => {
    if (!l.state) return;
    byState[l.state] = (byState[l.state] || 0) + 1;
    cityTally[l.state] = cityTally[l.state] || {};
    const city = l.city || "—";
    cityTally[l.state][city] = (cityTally[l.state][city] || 0) + 1;
  });
  const ranked = Object.entries(byState).sort((a, b) => b[1] - a[1]);

  const stateCard = (abbr, n, shape) => `
    <div class="state-card">
      <div class="state-card__shape">${shape || ""}</div>
      <span class="state-card__n">${n}</span>
      <span class="state-card__name">${STATE_NAMES[abbr] || abbr}</span>
    </div>`;

  const maxN = ranked.length ? ranked[0][1] : 1;
  const bars = ranked
    .map(([abbr, n]) => {
      const cities = Object.entries(cityTally[abbr] || {}).sort((a, b) => b[1] - a[1]);
      const cityRows = cities
        .map(([city, cn]) => `<div class="bar-city"><span>${city}</span><b>${cn}</b></div>`)
        .join("");
      const wide = cities.length > 7 ? " map-bar__cities--wide" : "";
      return `
      <div class="map-bar" tabindex="0">
        <span class="map-bar__name">${STATE_NAMES[abbr] || abbr}</span>
        <div class="map-bar__track"><div class="map-bar__fill" style="width:${Math.max(6, Math.round(n / maxN * 100))}%"></div></div>
        <span class="map-bar__num">${n}</span>
        ${cityRows ? `<div class="map-bar__cities${wide}" role="tooltip"><div class="map-bar__cities-h">${STATE_NAMES[abbr] || abbr} · by city</div><div class="bar-cities">${cityRows}</div></div>` : ""}
      </div>`;
    })
    .join("");

  el.innerHTML = `
    <div class="map-stats__head">
      <span class="map-stats__num">${locations.length}</span>
      <span class="map-stats__sub">cars sold across ${ranked.length} ${ranked.length === 1 ? "state" : "states"}</span>
    </div>
    <div class="map-stats__body">
      <div class="map-stats__tally">${ranked.map(([abbr, n]) => stateCard(abbr, n)).join("")}</div>
      <div class="map-stats__bars">
        <div class="map-bars__title">Sold by state</div>
        ${bars}
      </div>
    </div>`;

  // Add the real state silhouettes once the boundaries load (browser-cached
  // from the map layer's own fetch, so this is effectively instant).
  fetch("data/us-states.geojson")
    .then(r => r.json())
    .then(gj => {
      const byName = {};
      gj.features.forEach(f => { byName[f.properties.name] = f; });
      const tallyEl = el.querySelector(".map-stats__tally");
      tallyEl.innerHTML = ranked.map(([abbr, n]) => {
        const feat = byName[STATE_NAMES[abbr]];
        return stateCard(abbr, n, feat ? stateShapeSVG(feat) : "");
      }).join("");
    })
    .catch(() => { /* leave the plain cards already rendered above */ });
}

/* Compact readout pinned to the map's top-right: each reached state's
   silhouette with its count sitting inside it (the "number in shape"
   treatment). Purely informational — pointer-events off so it never
   blocks panning the map underneath. */
function renderMapHud(mapEl, locations, statesGeoJson) {
  if (!mapEl || !locations.length) return;
  if (mapEl.querySelector(".map-hud")) return; // don't double-add

  const byState = {};
  locations.forEach(l => { if (l.state) byState[l.state] = (byState[l.state] || 0) + 1; });
  const ranked = Object.entries(byState).sort((a, b) => b[1] - a[1]);

  const byName = {};
  statesGeoJson.features.forEach(f => { byName[f.properties.name] = f; });

  const hud = document.createElement("div");
  hud.className = "map-hud";
  hud.innerHTML = `
    <div class="map-hud__total">${locations.length}<span>sold</span></div>
    <div class="map-hud__states">
      ${ranked.map(([abbr, n]) => {
        const feat = byName[STATE_NAMES[abbr]];
        return `<div class="hud-state">
          <div class="hud-state__shape">${feat ? stateShapeSVG(feat) : ""}<span class="hud-state__num">${n}</span></div>
          <span class="hud-state__abbr">${abbr}</span>
        </div>`;
      }).join("")}
    </div>`;
  mapEl.appendChild(hud);
}

function renderCustomerMap() {
  const mapEl = document.getElementById("customerMap");
  if (!mapEl) return;

  fetch("data/customer-locations.built.json")
    .then(r => r.json())
    .then(data => {
      const locations = (data && data.locations) || [];

      renderCustomerMapStats(locations);

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

      fetch("data/us-states.geojson")
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

          renderMapHud(mapEl, locations, statesGeoJson);
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

      // Mobile browsers resize the visible viewport as the address bar
      // hides/shows while scrolling, which leaves Leaflet's cached
      // container size stale and the map badly mis-centered/zoomed
      // until it's told to recalculate.
      window.addEventListener("resize", () => map.invalidateSize());
      window.addEventListener("orientationchange", () => map.invalidateSize());

      // Quick, subtle ease-in from a wider view into the default center/zoom.
      map.invalidateSize();
      setTimeout(() => {
        map.invalidateSize();
        map.flyTo(CUSTOMER_MAP_CENTER, CUSTOMER_MAP_ZOOM, { duration: 0.9, easeLinearity: 0.25 });
      }, 100);
    })
    .catch(err => {
      console.error("Failed to load customer locations:", err);
    });
}

/* ---------------- Faint background map (homepage decoration) ----------------
   A non-interactive, very low-opacity version of the customer map, used
   purely as a subtle backdrop texture behind the homepage content. */
function renderHomeBackgroundMap() {
  const el = document.getElementById("homeBgMap");
  if (!el || typeof L === "undefined") return;

  fetch("data/customer-locations.built.json")
    .then(r => r.json())
    .then(data => {
      const locations = (data && data.locations) || [];

      const map = L.map(el, {
        center: CUSTOMER_MAP_CENTER,
        zoom: 12,
        zoomControl: false,
        attributionControl: true,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false,
        fadeAnimation: false
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: "abcd",
        maxZoom: 20
      }).addTo(map);

      locations.forEach(loc => {
        if (typeof loc.lat !== "number" || typeof loc.lng !== "number") return;
        L.circleMarker([loc.lat, loc.lng], {
          radius: 5,
          weight: 1,
          color: "#FF8F4D",
          fillColor: "#FF6B1F",
          fillOpacity: 0.7,
          interactive: false,
          className: "home-map-ping"
        }).addTo(map);
      });

      window.addEventListener("resize", () => map.invalidateSize());
      setTimeout(() => map.invalidateSize(), 200);
    })
    .catch(err => console.error("Failed to load background map data:", err));
}
