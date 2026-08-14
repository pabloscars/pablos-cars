/* ============================================================
   RENDERING LOGIC
   ============================================================ */

const FEATURE_CATEGORIES = [
  { key: "comfortFeatures", label: "Comfort & Convenience", items: [
    ["remoteStart", "Remote Start"],
    ["pushButtonStart", "Push Button Start"],
    ["keylessEntry", "Keyless Entry"],
    ["heatedSeats", "Heated Seats"],
    ["ventilatedSeats", "Ventilated Seats"],
    ["powerSeats", "Power Seats"],
    ["memorySeats", "Memory Seats"],
    ["heatedRearSeats", "Heated Rear Seats"],
    ["thirdRowSeating", "Third Row Seating"],
    ["foldingRearSeats", "Folding Rear Seats"],
    ["splitFoldingRearSeats", "Split Folding Rear Seats"],
    ["flatFoldingSeats", "Flat Folding Seats"],
    ["adjustableLumbarSupport", "Adjustable Lumbar Support"],
    ["heatedSteeringWheel", "Heated Steering Wheel"],
    ["dualClimateControl", "Dual Climate Control"],
    ["rearACVents", "Rear A/C Vents"],
    ["wirelessPhoneCharger", "Wireless Phone Charger"],
    ["autoDimmingMirrors", "Auto-Dimming Mirrors"],
    ["rainSensingWipers", "Rain-Sensing Wipers"],
    ["powerLiftgate", "Power Liftgate"],
    ["handsFreeLiftgate", "Hands-Free Liftgate"],
    ["remoteTrunkRelease", "Remote Trunk Release"],
    ["garageDoorOpener", "Garage Door Opener"],
    ["ambientLighting", "Ambient Lighting"],
    ["rearSunshade", "Rear Sunshade"],
    ["panoramicSunroof", "Panoramic Sunroof"],
    ["sunroofMoonroof", "Sunroof / Moonroof"],
    ["largeCargoSpace", "Large Cargo Space"],
    ["rearEntertainment", "Rear Entertainment"],
  ] },
  { key: "techFeatures", label: "Tech", items: [
    ["appleCarPlay", "Apple CarPlay"],
    ["androidAuto", "Android Auto"],
    ["bluetooth", "Bluetooth"],
    ["navigation", "Navigation"],
    ["backupCamera", "Backup Camera"],
    ["camera360", "360 Camera"],
    ["frontParkingSensors", "Front Parking Sensors"],
    ["rearParkingSensors", "Rear Parking Sensors"],
    ["headsUpDisplay", "Heads-Up Display"],
    ["digitalGaugeCluster", "Digital Gauge Cluster"],
    ["premiumSoundSystem", "Premium Sound System"],
    ["boseAudio", "Bose Audio"],
    ["harmanKardonAudio", "Harman Kardon Audio"],
    ["touchscreenRadio", "Touchscreen Radio"],
    ["usbCPorts", "USB-C Ports"],
    ["rearUsbPorts", "Rear USB Ports"],
    ["wifiHotspot", "WiFi Hotspot"],
    ["satelliteRadio", "Satellite Radio"],
    ["wirelessCarPlay", "Wireless CarPlay"],
  ] },
  { key: "driverAssistFeatures", label: "Driver Assist & Safety", items: [
    ["blindSpotMonitoring", "Blind Spot Monitoring"],
    ["laneKeepAssist", "Lane Keep Assist"],
    ["laneDepartureWarning", "Lane Departure Warning"],
    ["adaptiveCruiseControl", "Adaptive Cruise Control"],
    ["forwardCollisionAlert", "Forward Collision Alert"],
    ["automaticEmergencyBraking", "Automatic Emergency Braking"],
    ["rearCrossTrafficAlert", "Rear Cross Traffic Alert"],
    ["parkingAssist", "Parking Assist"],
    ["collisionAvoidance", "Collision Avoidance"],
    ["pedestrianDetection", "Pedestrian Detection"],
    ["trafficSignRecognition", "Traffic Sign Recognition"],
    ["automaticHighBeams", "Automatic High Beams"],
    ["tirePressureMonitoring", "Tire Pressure Monitoring"],
    ["stabilityControl", "Stability Control"],
    ["absBrakes", "ABS Brakes"],
  ] },
  { key: "performanceFeatures", label: "Performance & Driving", items: [
    ["sportMode", "Sport Mode"],
    ["paddleShifters", "Paddle Shifters"],
    ["turbocharged", "Turbocharged"],
    ["supercharged", "Supercharged"],
    ["bremboBrakes", "Brembo Brakes"],
    ["performanceExhaust", "Performance Exhaust"],
    ["airSuspension", "Air Suspension"],
    ["towPackage", "Tow Package"],
    ["limitedSlipDifferential", "Limited Slip Differential"],
    ["offRoadPackage", "Off-Road Package"],
    ["driveModes", "Drive Modes"],
    ["launchControl", "Launch Control"],
  ] },
  { key: "exteriorFeatures", label: "Exterior", items: [
    ["ledHeadlights", "LED Headlights"],
    ["hidHeadlights", "HID Headlights"],
    ["fogLights", "Fog Lights"],
    ["daytimeRunningLights", "Daytime Running Lights"],
    ["tintedWindows", "Tinted Windows"],
    ["roofRails", "Roof Rails"],
    ["runningBoards", "Running Boards"],
    ["bedLiner", "Bed Liner"],
    ["towHitch", "Tow Hitch"],
    ["heatedMirrors", "Heated Mirrors"],
    ["powerFoldingMirrors", "Power Folding Mirrors"],
    ["privacyGlass", "Privacy Glass"],
  ] },
  { key: "salvageFeatures", label: "Salvage / Rebuild Specific", items: [
    ["theftRecovery", "Theft Recovery"],
    ["cosmeticDamage", "Cosmetic Damage"],
    ["hailDamage", "Hail Damage"],
    ["sideSwipeDamage", "Side Swipe Damage"],
    ["frontEndDamage", "Front End Damage"],
    ["rearEndDamage", "Rear End Damage"],
    ["minorCollision", "Minor Collision"],
    ["rebuiltTitle", "Rebuilt Title"],
    ["salvageHistory", "Salvage History"],
  ] }
];

/* Rendered as wrench-icon bullets in the "What Was Repaired" section
   (alongside Pablo's free-text notes) rather than buried in the
   Vehicle Features toggle grid — this is specifically repair work,
   not a feature. */
const REPAIRS_COMPLETED_ITEMS = [
  ["oilChange", "Oil Change"],
  ["newBattery", "New Battery"],
  ["newTires", "New Tires"],
  ["alignment", "Alignment"],
  ["ncStateInspected", "NC State Inspection"],
  ["cabinAirFilter", "Cabin Air Filter"],
  ["engineAirFilter", "Engine Air Filter"],
  ["frontWipers", "Front Wipers"],
  ["rearWiper", "Rear Wiper"],
  ["sparkPlugs", "Spark Plugs"],
  ["frontRotorsPads", "Front Rotors & Pads"],
  ["rearRotorsPads", "Rear Rotors & Pads"],
  ["wheelBalance", "Wheel Balance"],
  ["tpmsSensors", "TPMS Sensors"],
  ["valveCoverGasket", "Valve Cover Gasket"],
  ["serpentineBelt", "Serpentine Belt"],
  ["coolantFlush", "Coolant Flush"],
  ["brakeFluidFlush", "Brake Fluid Flush"],
  ["fuelFilter", "Fuel Filter"],
];

/* Buckets the flat "What Was Repaired" list into rough categories by
   keyword-matching each label, so Pablo doesn't have to organize repair
   entries by hand. Rules are checked in order and the first match wins —
   more specific phrases (e.g. "brake light") are listed ahead of broader
   ones (e.g. "brake") so a taillight repair doesn't land under Brakes. */
const REPAIR_CATEGORY_RULES = [
  ["tpms", "Tires & Wheels"],
  ["tire", "Tires & Wheels"],
  ["wheel balance", "Tires & Wheels"],
  ["headlight", "Lights & Electrical"],
  ["taillight", "Lights & Electrical"],
  ["tail light", "Lights & Electrical"],
  ["brake light", "Lights & Electrical"],
  ["fog light", "Lights & Electrical"],
  ["turn signal", "Lights & Electrical"],
  ["bulb", "Lights & Electrical"],
  ["blower motor", "Lights & Electrical"],
  ["resistor", "Lights & Electrical"],
  ["alternator", "Lights & Electrical"],
  ["starter", "Lights & Electrical"],
  ["battery", "Lights & Electrical"],
  ["wiring", "Lights & Electrical"],
  ["relay", "Lights & Electrical"],
  ["module", "Lights & Electrical"],
  ["sensor", "Lights & Electrical"],
  ["rotor", "Brakes"],
  ["brake pad", "Brakes"],
  ["pads", "Brakes"],
  ["caliper", "Brakes"],
  ["brake fluid", "Brakes"],
  ["brake line", "Brakes"],
  ["alignment", "Suspension & Steering"],
  ["shock", "Suspension & Steering"],
  ["strut", "Suspension & Steering"],
  ["control arm", "Suspension & Steering"],
  ["ball joint", "Suspension & Steering"],
  ["sway bar", "Suspension & Steering"],
  ["bushing", "Suspension & Steering"],
  ["tie rod", "Suspension & Steering"],
  ["cv axle", "Suspension & Steering"],
  ["cv joint", "Suspension & Steering"],
  ["wheel bearing", "Suspension & Steering"],
  ["leaf spring", "Suspension & Steering"],
  ["coil spring", "Suspension & Steering"],
  ["suspension", "Suspension & Steering"],
  ["oil change", "Engine & Maintenance"],
  ["oil filter", "Engine & Maintenance"],
  ["air filter", "Engine & Maintenance"],
  ["spark plug", "Engine & Maintenance"],
  ["serpentine", "Engine & Maintenance"],
  ["belt", "Engine & Maintenance"],
  ["gasket", "Engine & Maintenance"],
  ["coolant", "Engine & Maintenance"],
  ["thermostat", "Engine & Maintenance"],
  ["water pump", "Engine & Maintenance"],
  ["fuel filter", "Engine & Maintenance"],
  ["fuel cap", "Engine & Maintenance"],
  ["fuel pump", "Engine & Maintenance"],
  ["timing", "Engine & Maintenance"],
  ["wiper", "Engine & Maintenance"],
  ["inspection", "Engine & Maintenance"],
];
const REPAIR_CATEGORY_ORDER = ["Engine & Maintenance", "Brakes", "Suspension & Steering", "Tires & Wheels", "Lights & Electrical", "Other Repairs"];
function categorizeRepair(label) {
  const lower = label.toLowerCase();
  const hit = REPAIR_CATEGORY_RULES.find(([kw]) => lower.includes(kw));
  return hit ? hit[1] : "Other Repairs";
}

/* Reassurance badges shown on the vehicle detail page — each is now
   its own standalone top-level field (not nested in Condition &
   Ownership), with an icon matching what it's actually about instead
   of a single generic shield for all four. */
const TRUST_BADGES = [
  ["noAirbagsDeployed", "No Airbags Deployed", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 9.5V4M9 13.5l-4.3 2.5M15 13.5l4.3 2.5"/></svg>`],
  ["noFrameDamage", "No Frame Damage", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15.5 L2 12.7 Q2 11.7 3 11.4 L5.7 10.6 L8.3 7.7 Q8.9 7.2 9.7 7.2 L14.5 7.2 Q15.3 7.2 15.9 7.7 L18.5 10.6 L20.8 11.2 Q21.8 11.5 21.8 12.5 L21.8 15.5"/><path d="M2 15.5L6 15.5"/><path d="M9 15.5L15 15.5"/><path d="M18 15.5L21.8 15.5"/><circle cx="7.5" cy="16.3" r="2"/><circle cx="16.5" cy="16.3" r="2"/></svg>`],
  ["noGlassBroken", "No Glass Broken", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 17L8 6.5H17L20.5 17Z"/><path d="M10 15L14 9" stroke-width="1.3" opacity="0.6"/></svg>`],
  ["noWarningLights", "No Warning Lights", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4"/><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none"/></svg>`],
];

function money(n) { return "$" + Number(n).toLocaleString("en-US"); }
function miles(n) { return Number(n).toLocaleString("en-US") + " mi"; }

/* Click-and-drag to scroll a horizontal thumbnail strip with a mouse —
   touch/pen already scroll it natively, so this only kicks in for
   pointerType "mouse". A real drag (moved past a few px) suppresses
   the click that would otherwise select a thumbnail underneath the
   cursor, so dragging never accidentally jumps to the wrong photo. */
function enableDragScroll(el) {
  if (!el) return;
  let isDown = false, dragged = false, startX = 0, startScroll = 0;

  el.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    isDown = true;
    dragged = false;
    startX = e.pageX;
    startScroll = el.scrollLeft;
    el.classList.add("is-dragging");
    el._isDragging = true;
  });

  el.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 4) dragged = true;
    if (dragged) {
      el.scrollLeft = startScroll - dx;
      e.preventDefault();
    }
  });

  function endDrag() {
    isDown = false;
    el.classList.remove("is-dragging");
    el._isDragging = false;
  }
  el.addEventListener("pointerup", endDrag);
  el.addEventListener("pointerleave", endDrag);

  el.addEventListener("click", (e) => {
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    }
  }, true);
}

/* Hover near either edge of a horizontal thumbnail strip and it slowly
   auto-scrolls that direction — no need to drag all the way to see
   thumbnails further down the row. Speed ramps up the closer the
   cursor gets to the edge. Paused while actively drag-scrolling
   (enableDragScroll marks el._isDragging) so the two don't fight. */
function enableEdgeAutoScroll(el) {
  if (!el) return;
  const EDGE_ZONE = 60;
  const MAX_SPEED = 5;
  let scrollSpeed = 0;
  let rafId = null;

  function tick() {
    if (scrollSpeed !== 0 && !el._isDragging) {
      el.scrollLeft += scrollSpeed;
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < EDGE_ZONE) {
      scrollSpeed = -Math.max(1, Math.round(((EDGE_ZONE - x) / EDGE_ZONE) * MAX_SPEED));
    } else if (x > rect.width - EDGE_ZONE) {
      scrollSpeed = Math.max(1, Math.round(((x - (rect.width - EDGE_ZONE)) / EDGE_ZONE) * MAX_SPEED));
    } else {
      scrollSpeed = 0;
    }
    if (rafId === null && scrollSpeed !== 0) rafId = requestAnimationFrame(tick);
  });

  el.addEventListener("mouseleave", () => {
    scrollSpeed = 0;
  });
}

/* Subtle magnetic pull on buttons — they lean toward the cursor while
   hovered. Desktop pointers only, and off under reduced-motion. */
function setupMagneticButtons() {
  if (!window.matchMedia("(pointer:fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  let lastBtn = null;
  document.addEventListener("pointermove", e => {
    const btn = e.target.closest && e.target.closest(".btn");
    if (btn) {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.32}px)`;
      lastBtn = btn;
    } else if (lastBtn) {
      lastBtn.style.transform = "";
      lastBtn = null;
    }
  });
}
setupMagneticButtons();

function carCardHTML(car) {
  const soldClass = car.status === "sold" ? "is-sold" : "";
  const cover = car.image || (car.photos && car.photos[0]) || "";
  const primaryTag = car.status === "sold"
    ? `Sold${car.dateSold ? " · " + new Date(car.dateSold).toLocaleDateString("en-US",{month:"short",year:"numeric"}) : ""}`
    : car.titleStatus;
  const tagsHTML = (car.tags || []).map(t => `<span class="chip">${t}</span>`).join("");

  return `
  <a href="vehicle.html?id=${encodeURIComponent(car.id)}" class="card ${soldClass}" data-id="${car.id}">
    <div class="card__photo">
      <img src="${cover}" alt="${car.year} ${car.make} ${car.model}" loading="lazy">
      <div class="card__scrim"></div>
      <div class="tag-top ${car.status === "sold" ? "tag-top--sold" : "tag-top--available"}">
        <span class="tag-top__dot"></span>${car.status === "sold" ? "sold" : "available"}
      </div>
      <div class="overlay-info">
        <div class="overlay-price">${money(car.price)}</div>
        <div class="overlay-mileage">${miles(car.mileage)}</div>
      </div>
    </div>
    <div class="card__body">
      <div class="card__title">${car.year} ${car.make} ${car.model}${car.trim ? " " + car.trim : ""}</div>
      <div class="chip-row">${car.status === "sold" ? `<span class="chip">${primaryTag}</span>` : tagsHTML}</div>
    </div>
  </a>`;
}

function cardsOrEmptyState(cars, extraClass) {
  if (!cars.length) return `<div class="empty-state">No vehicles listed right now — check back soon.</div>`;
  return `<div class="grid ${extraClass || ""}">${cars.map(carCardHTML).join("")}</div>`;
}

/* Display Order is a simple running count Pablo assigns by hand — 1 is
   the oldest car he's ever listed/sold, and each new one just gets the
   next number up. Higher number = more recent = shows first, matching
   "Just Arrived" / "Recently Sold". Cars without a number fall back to
   sorting by date (still newest first); a numbered car always outranks
   an unnumbered one. */
const hasOrder = c => c.sortOrder !== undefined && c.sortOrder !== null && c.sortOrder !== "";
function sortByDisplayOrder(cars, dateField) {
  return cars.slice().sort((a, b) => {
    if (hasOrder(a) && hasOrder(b)) return b.sortOrder - a.sortOrder;
    if (hasOrder(a)) return -1;
    if (hasOrder(b)) return 1;
    return new Date(b[dateField] || 0) - new Date(a[dateField] || 0);
  });
}

/* Just Arrived (available) first, with a "Sold" divider before the sold
   archive — unless ?view=available is set (from the "View Available
   Cars" link on a sold car's page), in which case sold cars are omitted
   entirely. */
/* Split-editorial hero: a headline column beside the newest available
   car shown large. The car image links straight to its listing. */
function renderHomeHero() {
  const root = document.getElementById("homeHero");
  if (!root) return;

  const available = sortByDisplayOrder(CARS.filter(c => c.status === "available"), "dateAdded");
  const soldCount = CARS.filter(c => c.status === "sold").length;
  const feat = available[0];

  const mediaHTML = feat
    ? `<a class="home-hero__media" href="vehicle.html?id=${encodeURIComponent(feat.id)}" aria-label="${feat.year} ${feat.make} ${feat.model}">
         <img src="${feat.image || (feat.photos && feat.photos[0]) || ""}" alt="${feat.year} ${feat.make} ${feat.model}">
         <div class="home-hero__cap">
           <span class="home-hero__cap-k">Featured · Available</span>
           <span class="home-hero__cap-n">${feat.year} ${feat.make} ${feat.model}${feat.trim ? " " + feat.trim : ""} · ${money(feat.price)}</span>
         </div>
       </a>`
    : `<div class="home-hero__media home-hero__media--empty">New arrivals soon</div>`;

  root.innerHTML = `
    <div class="container">
    <div class="home-hero">
      <div class="home-hero__text">
        <div class="home-hero__eyebrow">Salvage &amp; rebuilt title · Asheville, N.C.</div>
        <h1 class="home-hero__title"><span>Shown</span><span class="home-hero__title-o">in full.</span></h1>
        <p class="home-hero__sub">Every scar photographed, every repair listed, every title explained. What you see is what you get.</p>
        <div class="home-hero__meta">
          <div class="home-hero__stat"><span class="home-hero__num">${available.length}</span><span class="home-hero__lab">Available</span></div>
          <div class="home-hero__stat"><span class="home-hero__num">${soldCount}</span><span class="home-hero__lab">Sold</span></div>
          <div class="home-hero__place">
            Asheville, N.C.
            <svg class="home-hero__mtn" viewBox="0 0 26 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 15 L8 3.5 L12.5 9.5 L16 5 L25 15"/></svg>
          </div>
        </div>
      </div>
      ${mediaHTML}
    </div>
    </div>`;
}

function renderHomeFeed() {
  const root = document.getElementById("carFeedRoot");
  if (!root) return;

  const available = sortByDisplayOrder(CARS.filter(c => c.status === "available"), "dateAdded");
  const sold = sortByDisplayOrder(CARS.filter(c => c.status === "sold"), "dateSold");

  const availableOnly = new URLSearchParams(window.location.search).get("view") === "available";

  let html = `
    <div class="feed-heading"><h2>Just Arrived</h2></div>
    ${cardsOrEmptyState(available)}
  `;

  if (!availableOnly && sold.length) {
    // One grid of up to 6 sold cars; CSS keeps the first row clear and
    // fades the trailing cards (bottom row on desktop, the 3rd/4th cards
    // on mobile) under the "View All" button.
    const soldPreview = sold.slice(0, 6);
    const showFade = sold.length > 2;
    html += `
      <div class="feed-heading" style="margin-top:52px;"><h2>Recently Sold</h2></div>
      <div class="sold-preview${showFade ? " sold-preview--faded" : ""}">
        <div class="grid sold-preview__grid">${soldPreview.map(carCardHTML).join("")}</div>
        ${showFade ? `
          <div class="sold-preview__fade" aria-hidden="true"></div>
          <div class="sold-preview__cta">
            <a href="sold.html" class="btn btn--glass">View All Sold Vehicles</a>
          </div>` : ""}
      </div>
    `;
  }

  root.innerHTML = html;
}

/* Full list of every sold car, for sold.html */
function renderSoldFeed() {
  const root = document.getElementById("carFeedRoot");
  if (!root) return;
  const sold = sortByDisplayOrder(CARS.filter(c => c.status === "sold"), "dateSold");
  root.innerHTML = `
    <div class="feed-heading"><h2>All Sold Vehicles</h2></div>
    ${cardsOrEmptyState(sold, "grid--wide")}
  `;
}

/* ---------------- Vehicle detail page ---------------- */

function getCarFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return CARS.find(c => c.id === id);
}

function renderVehicleDetail() {
  const car = getCarFromQuery();
  const root = document.getElementById("vdpRoot");
  if (!car) {
    root.innerHTML = `<div class="container section"><div class="empty-state">
      <p>We couldn't find that vehicle — it may have sold or been removed.</p>
      <a href="index.html" class="btn btn--orange">View Current Inventory</a>
    </div></div>`;
    document.title = "Vehicle Not Found — " + BUSINESS.name;
    return;
  }

  document.title = `${car.year} ${car.make} ${car.model} — ${money(car.price)} — ${BUSINESS.name}`;

  const allPhotos = [car.image, ...(car.photos || [])].filter(Boolean);
  const tagsHTML = (car.tags || []).map(t => `<span class="chip">${t}</span>`).join("");

  const allHighlights = car.highlights || [];

  // Each category's "Other" list lets Pablo add a one-off item specific
  // to that car (e.g. a Tech feature the standard toggles don't cover)
  // without needing a new checkbox added to the schema for it.
  const customItemLabels = group => ((group && group.other) || []).filter(Boolean);

  const featureCategoriesHTML = FEATURE_CATEGORIES
    .map(cat => {
      const checked = cat.items.filter(([key]) => car[cat.key] && car[cat.key][key]).map(([, label]) => label);
      const allItems = [...checked, ...customItemLabels(car[cat.key])];
      if (!allItems.length) return "";
      return `
        <div class="feature-category">
          <h4>${cat.label}</h4>
          <ul class="highlights-list">${allItems.map(label => `<li>${label}</li>`).join("")}</ul>
        </div>`;
    })
    .join("");

  const trustBadgesHTML = TRUST_BADGES
    .filter(([key]) => car[key])
    .map(([, label, icon]) => `
      <div class="trust-badge">
        <div class="trust-badge__icon">${icon}</div>
        <div class="trust-badge__label">${label}</div>
      </div>`)
    .join("");

  const SLIDER_SECTIONS = new Set(["auctionPhotos", "deepCleaning"]);
  const sections = [
    ["auctionPhotos", "Auction Photos"],
    ["deepCleaning", "Deep Cleaning"],
    ["exterior", "Exterior"], ["interior", "Interior"],
    ["wheels", "Wheels"], ["doorPanels", "Door Panels"],
    ["engineBay", "Engine Bay"],
    ["defects", "Defects & Known Issues"],
    ["damageBefore", "Damage Before Repair"], ["repairDocs", "Repair Documentation"],
    ["tires", "Tires"], ["undercarriage", "Undercarriage"], ["titleDocs", "Title Documents"]
  ].filter(([key]) => car.photoSections && car.photoSections[key] && car.photoSections[key].length);

  const sectionsHTML = sections.map(([key, label]) => `
    <div class="photo-section ${SLIDER_SECTIONS.has(key) ? "photo-section--slider" : ""}" id="sec-${key}">
      <h3>${label}</h3>
      ${SLIDER_SECTIONS.has(key)
        ? photoSliderHTML(car.photoSections[key])
        : `<div class="photo-section__grid">${car.photoSections[key].map(src => `<img src="${src}" loading="lazy">`).join("")}</div>`}
    </div>`).join("");

  // Build one embedded player from a video URL. Returns null for a blank
  // URL so callers can just filter out the empty slots. TikTok clips come
  // back with the vertical (9:16) wrap class; everything else fills the
  // normal 16:9 frame.
  const videoEmbed = url => {
    if (!url) return null;
    if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("facebook.com")) {
      return { html: `<iframe src="${url}" allowfullscreen loading="lazy"></iframe>`, cls: "" };
    }
    if (url.includes("tiktok.com")) {
      // A full TikTok URL (…/video/1234567890) carries the numeric id we
      // can drop straight into TikTok's embed player. Short share links
      // (vm.tiktok.com/…) don't contain the id and can't be resolved in
      // the browser, so those fall back to a "watch on TikTok" button.
      const idMatch = url.match(/\/video\/(\d+)/) || url.match(/[?&]item_id=(\d+)/);
      if (idMatch) {
        return { html: `<iframe src="https://www.tiktok.com/player/v1/${idMatch[1]}" allow="encrypted-media; fullscreen" allowfullscreen loading="lazy"></iframe>`, cls: "video-wrap--vertical" };
      }
      return { html: `<a href="${url}" target="_blank" rel="noopener" class="btn btn--glass">Watch walkaround on TikTok</a>`, cls: "video-wrap--placeholder" };
    }
    return { html: `<video controls preload="metadata" src="${url}"></video>`, cls: "" };
  };

  // Slot titles are fixed — video 1 is the short sell clip, video 2 the
  // longer walkaround. Whichever slots are filled render (and the row
  // centers a single video), so a car with only one still looks right.
  const videos = [
    { embed: videoEmbed(car.videoUrl), caption: "Quick Look" },
    { embed: videoEmbed(car.videoUrl2), caption: "Full Walkaround" },
  ].filter(v => v.embed);

  const videosHTML = videos.length
    ? `<div class="video-row" style="margin-top:20px;">${videos.map(v => `
        <div class="video-col">
          ${v.caption ? `<div class="video-col__label">${v.caption}</div>` : ""}
          <div class="video-wrap ${v.embed.cls}">${v.embed.html}</div>
        </div>`).join("")}</div>`
    : `<div class="video-wrap video-wrap--placeholder" style="margin-top:20px;"><div class="video-placeholder">Walkaround video coming soon.</div></div>`;

  const repairsCompletedLabels = [
    ...REPAIRS_COMPLETED_ITEMS.filter(([key]) => car.repairsCompleted && car.repairsCompleted[key]).map(([, label]) => label),
    ...customItemLabels(car.repairsCompleted),
  ];
  const repairedNotes = (car.whatWasRepaired || "")
    .split("\n")
    .map(line => line.replace(/^[\s.\-•]+/, "").trim())
    .filter(Boolean);
  const repairedItems = [...repairsCompletedLabels, ...repairedNotes];

  // Why It Has A [Title] and Known Issues sit side by side and should
  // match heights regardless of which has more text — nested grid with
  // align-items:stretch (the outer .feature-grid overrides that to
  // "start" so cards don't stretch to match wide full-row cards below
  // them). Either card is dropped entirely if its field is empty, and
  // if only one remains it gets the full row instead of sitting alone
  // in a half-width column.
  const whySalvageCard = car.whySalvage ? `<div class="feature-card"><h3>Why It Has A ${car.titleStatus}</h3><p>${car.whySalvage}</p></div>` : "";
  const knownIssuesCard = car.knownIssues ? `<div class="feature-card"><h3>Known Issues</h3><p>${car.knownIssues}</p></div>` : "";
  const titleIssuesPairHTML = (whySalvageCard || knownIssuesCard)
    ? `<div class="feature-card--wide" style="display:grid; gap:18px; grid-template-columns:${car.whySalvage && car.knownIssues ? "1fr 1fr" : "1fr"}; align-items:stretch;">${whySalvageCard}${knownIssuesCard}</div>`
    : "";

  const messageHref = car.facebookUrl || BUSINESS.facebookUrl;

  root.innerHTML = `
    <div class="blob blob--chrome" style="width:400px; height:400px; top:0; right:-120px; position:fixed;"></div>
    <div class="container section">
      <div class="vdp">
        <div class="vdp-photos-col">
          <div class="gallery">
            <div class="gallery__main">
              <img id="mainPhoto" src="${allPhotos[0] || ""}" alt="${car.year} ${car.make} ${car.model}">
              ${allPhotos.length > 1 ? `
                <button class="gallery__arrow gallery__arrow--prev" id="mainPrevBtn" aria-label="Previous photo">&#8249;</button>
                <button class="gallery__arrow gallery__arrow--next" id="mainNextBtn" aria-label="Next photo">&#8250;</button>
              ` : ""}
            </div>
            ${allPhotos.length > 1 ? `<div class="gallery__thumbs" id="thumbRow">
              ${allPhotos.map((src, i) => `<img src="${src}" data-i="${i}" class="${i === 0 ? "is-active" : ""}">`).join("")}
            </div>` : ""}
          </div>

          ${videosHTML}
        </div>

        <div class="vdp-sidebar-col">
          <aside class="vdp-sidebar">
            <div class="tag-top ${car.status === "sold" ? "tag-top--sold" : "tag-top--available"}" style="position:static; display:inline-flex; margin-bottom:12px;">
              <span class="tag-top__dot"></span>${car.status === "sold" ? "sold" : car.titleStatus.toLowerCase()}
            </div>
            <h1 class="vdp-title" style="font-size:1.6rem;">${car.year} ${car.make} ${car.model}${car.trim ? " " + car.trim : ""}</h1>
            <div class="vdp-price">${money(car.price)}</div>
            <div class="chip-row" style="margin-top:10px;">${tagsHTML}</div>

            <dl class="vdp-specs">
              <div class="vdp-spec--featured"><dt>Mileage</dt><dd>${miles(car.mileage)}</dd></div>
              <div><dt>Engine</dt><dd>${car.engine}</dd></div>
              <div><dt>Transmission</dt><dd>${car.transmission}</dd></div>
              ${car.drivetrain ? `<div><dt>Drivetrain</dt><dd>${car.drivetrain}</dd></div>` : ""}
              ${car.keyCount ? `<div><dt>Keys</dt><dd>${car.keyCount}</dd></div>` : ""}
              <div><dt>Location</dt><dd>${car.location}</dd></div>
              ${car.fuelType ? `<div><dt>Fuel Type</dt><dd>${car.fuelType}</dd></div>` : ""}
              ${car.exteriorColor ? `<div><dt>Exterior Color</dt><dd>${car.exteriorColor}</dd></div>` : ""}
              ${car.interiorColor ? `<div><dt>Interior Color</dt><dd>${car.interiorColor}</dd></div>` : ""}
              ${car.interiorMaterial ? `<div><dt>Interior Material</dt><dd>${car.interiorMaterial}</dd></div>` : ""}
              ${car.mpg ? `<div><dt>Fuel Economy</dt><dd>${car.mpg}</dd></div>` : ""}
              ${car.showVin && car.vin ? `<div style="grid-column:1/-1;"><dt>VIN</dt><dd>${car.vin}</dd></div>` : ""}
            </dl>

            ${trustBadgesHTML ? `<div class="trust-badges">${trustBadgesHTML}</div>` : ""}

            ${car.status !== "sold" ? `
            <div class="info-block" style="border-top:none; padding-top:0; margin-top:0;">
              <div class="btn-row" style="flex-direction:column;">
                <a href="${messageHref}" target="_blank" rel="noopener" class="btn btn--orange btn--block">
                  <svg class="msg-icon" viewBox="0 0 24 24" fill="none" stroke="#241000" stroke-width="2"><path d="M4 4h16v12H8l-4 4V4z"/></svg>
                  Message about this car
                </a>
              </div>
            </div>
            <div class="callout" style="margin-top:16px;"><strong>Good to know:</strong> ${BUSINESS.policyNote}</div>
            ` : `
            <div class="info-block">
              <p>This vehicle has already sold.</p>
              <a href="index.html?view=available" class="btn btn--orange btn--block">View Available Cars</a>
            </div>`}
          </aside>

          ${sectionsHTML}
        </div>

        <div class="vdp-details-col">
          <div class="divider"></div>
          <h2>About This ${car.make} ${car.model}</h2>
          <p class="lede">${car.description}</p>

          <div class="feature-grid" style="margin-top:16px;">
            ${titleIssuesPairHTML}
            ${repairedItems.length ? `
            <div class="feature-card feature-card--wide">
              <h3>What Was Repaired</h3>
              ${REPAIR_CATEGORY_ORDER.map(cat => {
                const items = repairedItems.filter(item => categorizeRepair(item) === cat);
                if (!items.length) return "";
                return `
                <div class="feature-category">
                  <h4>${cat}</h4>
                  <ul class="highlights-list highlights-list--repaired">${items.map(item => `<li>${item}</li>`).join("")}</ul>
                </div>`;
              }).join("")}
            </div>` : ""}
            ${allHighlights.length ? `
            <div class="feature-card feature-card--wide">
              <h3>Highlights &amp; Features</h3>
              <ul class="highlights-list">${allHighlights.map(h => `<li>${h}</li>`).join("")}</ul>
            </div>` : ""}
            ${featureCategoriesHTML ? `
            <div class="feature-card feature-card--wide">
              <h3>Vehicle Features</h3>
              ${featureCategoriesHTML}
            </div>` : ""}
          </div>
        </div>
      </div>
    </div>
  `;

  const mainPhoto = document.getElementById("mainPhoto");
  let currentMainIndex = 0;
  let mainSwiped = false;
  if (mainPhoto) {
    mainPhoto.addEventListener("click", () => {
      if (mainSwiped) { mainSwiped = false; return; }
      openLightbox(allPhotos, currentMainIndex);
    });
  }

  if (allPhotos.length > 1) {
    const mainPrevBtn = document.getElementById("mainPrevBtn");
    const mainNextBtn = document.getElementById("mainNextBtn");

    function goToMainPhoto(i) {
      // Wraps around in both directions — past the last photo goes back
      // to the first, and back past the first goes to the last.
      currentMainIndex = ((i % allPhotos.length) + allPhotos.length) % allPhotos.length;
      mainPhoto.src = allPhotos[currentMainIndex];
      document.querySelectorAll("#thumbRow img").forEach((t, idx) => t.classList.toggle("is-active", idx === currentMainIndex));
    }

    // Swipe the main photo left/right to move between photos. A plain tap
    // still opens the full-screen viewer — mainSwiped suppresses that tap.
    if (mainPhoto) {
      let sx = 0, sy = 0;
      mainPhoto.addEventListener("touchstart", e => { const t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; }, { passive: true });
      mainPhoto.addEventListener("touchend", e => {
        const t = e.changedTouches[0];
        const dx = t.clientX - sx, dy = t.clientY - sy;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          goToMainPhoto(currentMainIndex + (dx < 0 ? 1 : -1));
          mainSwiped = true;
        }
      }, { passive: true });
    }

    enableDragScroll(document.getElementById("thumbRow"));
    enableEdgeAutoScroll(document.getElementById("thumbRow"));

    document.getElementById("thumbRow").addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      goToMainPhoto(Number(img.dataset.i));
    });

    if (mainPrevBtn) mainPrevBtn.addEventListener("click", () => goToMainPhoto(currentMainIndex - 1));
    if (mainNextBtn) mainNextBtn.addEventListener("click", () => goToMainPhoto(currentMainIndex + 1));
  }

  root.querySelectorAll(".photo-section__grid").forEach(grid => {
    const imgs = [...grid.querySelectorAll("img")];
    const srcs = imgs.map(i => i.src);
    imgs.forEach((img, i) => img.addEventListener("click", () => openLightbox(srcs, i)));
  });

  root.querySelectorAll(".photo-slider").forEach(initPhotoSlider);
}

/* ---------------- Auction Photos slider (3 per page, glass thumb strip) ---------------- */

const SLIDER_PAGE_SIZE = 2;

function photoSliderHTML(images) {
  const pages = [];
  for (let i = 0; i < images.length; i += SLIDER_PAGE_SIZE) pages.push(images.slice(i, i + SLIDER_PAGE_SIZE));

  const pagesHTML = pages.map(page => `
    <div class="photo-slider__page" style="grid-template-columns:repeat(${SLIDER_PAGE_SIZE}, 1fr);">${page.map(src => `<div class="photo-slider__frame"><img src="${src}" loading="lazy"></div>`).join("")}</div>`
  ).join("");

  const thumbsHTML = images.map((src, i) => `<img src="${src}" data-i="${i}" class="${i < SLIDER_PAGE_SIZE ? "is-active" : ""}" loading="lazy">`).join("");

  return `
    <div class="photo-slider" data-page-count="${pages.length}">
      <div class="photo-slider__viewport">
        <div class="photo-slider__track">${pagesHTML}</div>
        ${pages.length > 1 ? `
          <button class="photo-slider__arrow photo-slider__arrow--prev is-disabled" aria-label="Previous photos">&#8249;</button>
          <button class="photo-slider__arrow photo-slider__arrow--next" aria-label="Next photos">&#8250;</button>
        ` : ""}
      </div>
      ${images.length > 1 ? `<div class="photo-slider__thumbs">${thumbsHTML}</div>` : ""}
    </div>`;
}

function initPhotoSlider(slider) {
  const track = slider.querySelector(".photo-slider__track");
  const pageCount = Number(slider.dataset.pageCount);
  const prevBtn = slider.querySelector(".photo-slider__arrow--prev");
  const nextBtn = slider.querySelector(".photo-slider__arrow--next");
  const thumbs = [...slider.querySelectorAll(".photo-slider__thumbs img")];
  const frameImgs = [...slider.querySelectorAll(".photo-slider__frame img")];
  const allSrcs = frameImgs.map(img => img.src);
  let page = 0;

  function goToPage(p) {
    page = Math.max(0, Math.min(pageCount - 1, p));
    track.style.transform = `translateX(-${page * 100}%)`;
    thumbs.forEach((t, i) => t.classList.toggle("is-active", Math.floor(i / SLIDER_PAGE_SIZE) === page));
    if (prevBtn) prevBtn.classList.toggle("is-disabled", page === 0);
    if (nextBtn) nextBtn.classList.toggle("is-disabled", page === pageCount - 1);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goToPage(page - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goToPage(page + 1));
  enableDragScroll(slider.querySelector(".photo-slider__thumbs"));
  enableEdgeAutoScroll(slider.querySelector(".photo-slider__thumbs"));
  thumbs.forEach((thumb, i) => thumb.addEventListener("click", () => goToPage(Math.floor(i / SLIDER_PAGE_SIZE))));
  frameImgs.forEach((img, i) => img.addEventListener("click", () => openLightbox(allSrcs, i)));
}

/* ---------------- Lightbox (click a photo to enlarge, arrow keys to move
   between the photos in that same gallery/section, Escape to close) ---------------- */

let lightboxImages = [];
let lightboxIndex = 0;
let lbScale = 1, lbTx = 0, lbTy = 0;

function lbApplyTransform() {
  const img = document.getElementById("lightboxImg");
  if (img) img.style.transform = `translate(${lbTx}px, ${lbTy}px) scale(${lbScale})`;
  const overlay = document.getElementById("lightboxOverlay");
  if (overlay) overlay.classList.toggle("is-zoomed", lbScale > 1);
}
function lbResetZoom() { lbScale = 1; lbTx = 0; lbTy = 0; lbApplyTransform(); }
function lbClampPan() {
  const img = document.getElementById("lightboxImg");
  if (!img) return;
  const maxX = Math.max(0, (img.clientWidth * lbScale - img.clientWidth) / 2);
  const maxY = Math.max(0, (img.clientHeight * lbScale - img.clientHeight) / 2);
  lbTx = Math.min(maxX, Math.max(-maxX, lbTx));
  lbTy = Math.min(maxY, Math.max(-maxY, lbTy));
}

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  let overlay = document.getElementById("lightboxOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "lightboxOverlay";
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = `
      <button class="lightbox__close" aria-label="Close">&times;</button>
      <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous photo">&#8249;</button>
      <img id="lightboxImg" alt="">
      <button class="lightbox__nav lightbox__nav--next" aria-label="Next photo">&#8250;</button>
      <div class="lightbox__counter" id="lightboxCounter"></div>`;

    // A tap on the dark backdrop closes (only when not zoomed); taps on
    // the image/controls don't. A swipe sets `swiped` so its trailing
    // click never closes the box.
    let swiped = false;
    let mode = null; // "pinch" | "pan" | "swipe"
    let pinchDist0 = 0, pinchScale0 = 1, panX0 = 0, panY0 = 0, tx0 = 0, ty0 = 0, swX0 = 0, swY0 = 0;
    const dist2 = (a, b) => Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);

    overlay.addEventListener("click", e => {
      if (swiped) { swiped = false; return; }
      if (e.target === overlay && lbScale === 1) closeLightbox();
    });
    overlay.querySelector(".lightbox__close").addEventListener("click", e => { e.stopPropagation(); closeLightbox(); });
    overlay.querySelector(".lightbox__nav--prev").addEventListener("click", e => { e.stopPropagation(); lightboxStep(-1); });
    overlay.querySelector(".lightbox__nav--next").addEventListener("click", e => { e.stopPropagation(); lightboxStep(1); });

    overlay.addEventListener("touchstart", e => {
      if (e.touches.length === 2) {
        mode = "pinch";
        pinchDist0 = dist2(e.touches[0], e.touches[1]);
        pinchScale0 = lbScale;
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        if (lbScale > 1) { mode = "pan"; panX0 = t.clientX; panY0 = t.clientY; tx0 = lbTx; ty0 = lbTy; }
        else { mode = "swipe"; swX0 = t.clientX; swY0 = t.clientY; }
      }
    }, { passive: true });

    overlay.addEventListener("touchmove", e => {
      if (mode === "pinch" && e.touches.length >= 2) {
        lbScale = Math.min(4, Math.max(1, pinchScale0 * (dist2(e.touches[0], e.touches[1]) / pinchDist0)));
        lbClampPan();
        lbApplyTransform();
        e.preventDefault();
      } else if (mode === "pan" && e.touches.length === 1) {
        const t = e.touches[0];
        lbTx = tx0 + (t.clientX - panX0);
        lbTy = ty0 + (t.clientY - panY0);
        lbClampPan();
        lbApplyTransform();
        e.preventDefault();
      }
    }, { passive: false });

    overlay.addEventListener("touchend", e => {
      if (mode === "pinch" && lbScale <= 1.03) {
        lbResetZoom();
      } else if (mode === "swipe") {
        const t = e.changedTouches[0];
        const dx = t.clientX - swX0, dy = t.clientY - swY0;
        if (lbScale === 1 && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) { lightboxStep(dx < 0 ? 1 : -1); swiped = true; }
      }
      if (e.touches.length === 0) mode = null;
    }, { passive: true });

    // Mouse wheel zooms toward the cursor (desktop).
    overlay.addEventListener("wheel", e => {
      e.preventDefault();
      const rect = overlay.getBoundingClientRect();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      const s = lbScale;
      const s2 = Math.min(4, Math.max(1, s * (e.deltaY < 0 ? 1.18 : 1 / 1.18)));
      if (s2 === s) return;
      const r = s2 / s;
      lbTx = (e.clientX - cx) * (1 - r) + r * lbTx;
      lbTy = (e.clientY - cy) * (1 - r) + r * lbTy;
      lbScale = s2;
      if (lbScale === 1) { lbTx = 0; lbTy = 0; }
      lbClampPan();
      lbApplyTransform();
    }, { passive: false });

    // Click-drag to pan when zoomed in (desktop).
    let dragging = false, dgX0 = 0, dgY0 = 0, dgTx0 = 0, dgTy0 = 0;
    overlay.addEventListener("mousedown", e => {
      if (lbScale <= 1 || e.target.closest(".lightbox__nav, .lightbox__close")) return;
      dragging = true; dgX0 = e.clientX; dgY0 = e.clientY; dgTx0 = lbTx; dgTy0 = lbTy;
      e.preventDefault();
    });
    window.addEventListener("mousemove", e => {
      if (!dragging) return;
      lbTx = dgTx0 + (e.clientX - dgX0);
      lbTy = dgTy0 + (e.clientY - dgY0);
      lbClampPan();
      lbApplyTransform();
    });
    window.addEventListener("mouseup", () => { dragging = false; });

    document.addEventListener("keydown", handleLightboxKeydown);
    document.body.appendChild(overlay);
  }
  showLightboxImage();
  overlay.classList.add("is-open");
}

function lightboxStep(dir) {
  if (!lightboxImages.length) return;
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  showLightboxImage();
}

function showLightboxImage() {
  document.getElementById("lightboxImg").src = lightboxImages[lightboxIndex];
  lbResetZoom();
  const counter = document.getElementById("lightboxCounter");
  if (counter) counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function handleLightboxKeydown(e) {
  const overlay = document.getElementById("lightboxOverlay");
  if (!overlay || !overlay.classList.contains("is-open")) return;
  if (e.key === "Escape") { closeLightbox(); return; }
  if (e.key === "ArrowRight") lightboxStep(1);
  if (e.key === "ArrowLeft") lightboxStep(-1);
}

function closeLightbox() {
  const overlay = document.getElementById("lightboxOverlay");
  if (overlay) overlay.classList.remove("is-open");
}
