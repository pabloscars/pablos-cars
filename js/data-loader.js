/* ============================================================
   DATA LOADER
   ------------------------------------------------------------
   Loads data/cars.json and data/business.json — the two files
   the CMS (see /admin) edits directly. Every page calls
   loadSiteData() and does its rendering inside the .then().

   NOTE: because this uses fetch() to load local JSON files,
   this site must be viewed through a real web server (Netlify,
   or a local dev server) — it will NOT work by double-clicking
   index.html and opening it directly as a file:// URL. See
   README.md for how to preview it locally.
   ============================================================ */

let CARS = [];
let BUSINESS = {};

function loadSiteData() {
  return Promise.all([
    fetch("data/cars.json").then(r => r.json()),
    fetch("data/business.json").then(r => r.json())
  ]).then(([carsData, business]) => {
    CARS = carsData.cars || [];
    BUSINESS = business;
    return { CARS, BUSINESS };
  }).catch(err => {
    console.error("Failed to load site data:", err);
    document.body.innerHTML = `<div style="padding:60px 24px; font-family:monospace; color:#F5F3EE; background:#141310;">
      Couldn't load site data. If you're viewing this file directly from your computer, that won't work —
      this site needs to be viewed through a web server. See README.md for how to preview it locally, or just view it on the live Netlify URL once deployed.
    </div>`;
    throw err;
  });
}
