/* ============================================================
   BUILD: read data/customer-locations.json (simple city/state
   entries, one per purchase — duplicates allowed) and resolve
   each unique city to coordinates via OpenStreetMap's free
   Nominatim geocoder (no API key/account needed). Writes
   data/customer-locations.built.json, which is what
   js/customer-map.js actually fetches.

   Duplicate entries for the same city (e.g. three purchases
   from Leicester, NC) are fanned out into a small cluster of
   distinct points around the city's center so each one is its
   own clickable pin instead of stacking exactly on top of each
   other. Runs on every Netlify deploy (see netlify.toml).
   ============================================================ */

const fs = require("fs");
const path = require("path");

const srcFile = path.join(__dirname, "..", "data", "customer-locations.json");
const businessFile = path.join(__dirname, "..", "data", "business.json");
const outFile = path.join(__dirname, "..", "data", "customer-locations.built.json");

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const RATE_LIMIT_MS = 1100; // Nominatim usage policy: max 1 request/sec

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocode(city, state, userAgent) {
  const url = `${NOMINATIM_URL}?format=json&limit=1&country=USA&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`;
  const res = await fetch(url, { headers: { "User-Agent": userAgent } });
  if (!res.ok) throw new Error(`Nominatim returned ${res.status}`);
  const results = await res.json();
  if (!results.length) return null;
  return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
}

function jitteredPoints(baseLat, baseLng, count) {
  if (count === 1) return [{ lat: baseLat, lng: baseLng }];
  const radiusDeg = 0.03; // roughly a couple miles — a visual cluster, not precise placement
  const points = [];
  for (let i = 0; i < count; i++) {
    const angle = (2 * Math.PI * i) / count;
    const latOffset = radiusDeg * Math.sin(angle);
    const lngOffset = (radiusDeg * Math.cos(angle)) / Math.cos((baseLat * Math.PI) / 180);
    points.push({ lat: baseLat + latOffset, lng: baseLng + lngOffset });
  }
  return points;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(srcFile, "utf8"));
  const locations = data.locations || [];

  let contactEmail = "info@pablos-cars.com";
  try {
    contactEmail = JSON.parse(fs.readFileSync(businessFile, "utf8")).email || contactEmail;
  } catch {}
  const userAgent = `PablosCarsCustomerMap/1.0 (+mailto:${contactEmail})`;

  const groups = new Map(); // "city|state" -> [entries...]
  for (const loc of locations) {
    if (!loc.city || !loc.state) continue;
    const key = `${loc.city.trim().toLowerCase()}|${loc.state.trim().toLowerCase()}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(loc);
  }

  const output = [];
  for (const [, entries] of groups) {
    const { city, state } = entries[0];
    let coords = null;
    try {
      coords = await geocode(city, state, userAgent);
    } catch (err) {
      console.warn(`Skipping "${city}, ${state}" — geocoding failed: ${err.message}`);
    }
    if (!coords) {
      console.warn(`Skipping "${city}, ${state}" — no geocoding match found.`);
    } else {
      const points = jitteredPoints(coords.lat, coords.lng, entries.length);
      points.forEach(p => output.push({ city, state, lat: p.lat, lng: p.lng }));
    }
    await sleep(RATE_LIMIT_MS);
  }

  fs.writeFileSync(outFile, JSON.stringify({ locations: output }, null, 2) + "\n");
  console.log(`Built data/customer-locations.built.json with ${output.length} pin(s) from ${groups.size} unique location(s).`);
}

main().catch(err => {
  console.error("build-customer-map failed:", err);
  process.exit(1);
});
