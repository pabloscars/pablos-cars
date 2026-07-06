/* ============================================================
   BUILD: combine data/cars/*.json (one file per car, edited by
   the CMS as a folder collection) into data/cars.json, which is
   the single file js/data-loader.js actually fetches at runtime.
   Runs automatically on every Netlify deploy (see netlify.toml),
   and can be run locally with: node build/build-cars-json.js
   ============================================================ */

const fs = require("fs");
const path = require("path");

const carsDir = path.join(__dirname, "..", "data", "cars");
const outFile = path.join(__dirname, "..", "data", "cars.json");

const files = fs.readdirSync(carsDir).filter(f => f.endsWith(".json"));

const cars = files.map(file => {
  const filePath = path.join(carsDir, file);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    throw new Error(`Failed to parse ${filePath}: ${err.message}`);
  }
});

cars.sort((a, b) => (a.id || "").localeCompare(b.id || ""));

fs.writeFileSync(outFile, JSON.stringify({ cars }, null, 2) + "\n");

console.log(`Built data/cars.json from ${cars.length} file(s) in data/cars/`);
