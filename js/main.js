/* ============================================================
   RENDERING LOGIC
   ============================================================ */

const FEATURE_CATEGORIES = [
  { key: "comfortFeatures", label: "Comfort & Convenience", items: [
    ["remoteStart", "Remote Start"],
    ["pushButtonStart", "Push Button Start"],
    ["keylessEntry", "Keyless Entry"],
    ["heatedSeats", "Heated Seats"],
    ["heatedSteeringWheel", "Heated Steering Wheel"],
    ["ventilatedSeats", "Ventilated Seats"],
    ["powerSeats", "Power Seats"],
    ["memorySeats", "Memory Seats"],
    ["dualClimateControl", "Dual Climate Control"],
    ["rearACVents", "Rear A/C Vents"],
    ["ambientLighting", "Ambient Lighting"],
    ["wirelessPhoneCharger", "Wireless Phone Charger"],
    ["autoDimmingMirrors", "Auto-Dimming Mirrors"],
    ["rainSensingWipers", "Rain-Sensing Wipers"],
    ["powerLiftgate", "Power Liftgate"],
    ["handsFreeLiftgate", "Hands-Free Liftgate"],
    ["remoteTrunkRelease", "Remote Trunk Release"],
    ["garageDoorOpener", "Garage Door Opener"],
    ["rearSunshade", "Rear Sunshade"],
    ["panoramicSunroof", "Panoramic Sunroof"],
    ["sunroofMoonroof", "Sunroof / Moonroof"],
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
    ["awd", "AWD"],
    ["fourWD", "4WD"],
    ["rwd", "RWD"],
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
  { key: "interiorFeatures", label: "Interior", items: [
    ["thirdRowSeating", "Third Row Seating"],
    ["foldingRearSeats", "Folding Rear Seats"],
    ["splitFoldingRearSeats", "Split Folding Rear Seats"],
    ["heatedRearSeats", "Heated Rear Seats"],
    ["rearEntertainment", "Rear Entertainment"],
    ["largeCargoSpace", "Large Cargo Space"],
    ["flatFoldingSeats", "Flat Folding Seats"],
    ["adjustableLumbarSupport", "Adjustable Lumbar Support"],
  ] },
  { key: "conditionFeatures", label: "Condition & Ownership", items: [
    ["runsAndDrives", "Runs & Drives"],
    ["highwayTested", "Highway Tested"],
    ["coldAC", "Cold A/C"],
    ["noWarningLights", "No Warning Lights"],
    ["noAirbagsDeployed", "No Airbags Deployed"],
    ["noFrameDamage", "No Frame Damage"],
    ["noFloodDamage", "No Flood Damage"],
    ["ncStateInspected", "NC State Inspected"],
    ["freshOilChange", "Fresh Oil Change"],
    ["freshAlignment", "Fresh Alignment"],
    ["freshTires", "Fresh Tires"],
    ["singleKey", "Single Key"],
    ["twoKeys", "Two Keys"],
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
    ["structuralDamageRepaired", "Structural Damage Repaired"],
    ["airbagsReplaced", "Airbags Replaced"],
    ["professionallyRepaired", "Professionally Repaired"],
    ["stateRebuiltInspectionPassed", "State Rebuilt Inspection Passed"],
  ] },
  { key: "historyFeatures", label: "Vehicle History & Service", items: [
    ["serviceRecordsAvailable", "Service Records Available"],
    ["carfaxAvailable", "CarFax Available"],
    ["oneOwner", "One Owner"],
    ["twoOwner", "Two Owner"],
    ["fleetMaintained", "Fleet Maintained"],
    ["dealerServiced", "Dealer Serviced"],
    ["newBrakes", "New Brakes"],
    ["newTires", "New Tires"],
    ["newBattery", "New Battery"],
    ["newSuspensionParts", "New Suspension Parts"],
    ["transmissionServiced", "Transmission Serviced"],
  ] }
];

function money(n) { return "$" + Number(n).toLocaleString("en-US"); }
function miles(n) { return Number(n).toLocaleString("en-US") + " mi"; }

function carCardHTML(car) {
  const soldClass = car.status === "sold" ? "is-sold" : "";
  const cover = car.image || (car.photos && car.photos[0]) || "";
  const primaryTag = car.status === "sold"
    ? `Sold${car.dateSold ? " · " + new Date(car.dateSold).toLocaleDateString("en-US",{month:"short",year:"numeric"}) : ""}`
    : car.titleStatus;
  const tagsHTML = car.tags.map(t => `<span class="chip">${t}</span>`).join("");

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

function renderFeed(targetId, cars) {
  const el = document.getElementById(targetId);
  if (!el) return;
  if (!cars.length) {
    el.innerHTML = `<div class="empty-state">No vehicles listed right now — check back soon.</div>`;
    return;
  }
  el.innerHTML = cars.map(carCardHTML).join("");
}

/* Available first, then sold — one continuous feed, no headers */
function renderHomeFeed() {
  const hasOrder = c => c.sortOrder !== undefined && c.sortOrder !== null && c.sortOrder !== "";
  const available = CARS.filter(c => c.status === "available").sort((a, b) => {
    if (hasOrder(a) && hasOrder(b)) return a.sortOrder - b.sortOrder;
    if (hasOrder(a)) return -1;
    if (hasOrder(b)) return 1;
    return new Date(b.dateAdded||0) - new Date(a.dateAdded||0);
  });
  const sold = CARS.filter(c => c.status === "sold").sort((a,b) => new Date(b.dateSold||0) - new Date(a.dateSold||0));
  renderFeed("carFeed", [...available, ...sold]);
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
  const tagsHTML = car.tags.map(t => `<span class="chip">${t}</span>`).join("");

  const allHighlights = car.highlights || [];

  const featureCategoriesHTML = FEATURE_CATEGORIES
    .map(cat => {
      const checked = cat.items.filter(([key]) => car[cat.key] && car[cat.key][key]);
      if (!checked.length) return "";
      return `
        <div class="feature-category">
          <h4>${cat.label}</h4>
          <ul class="highlights-list">${checked.map(([, label]) => `<li>${label}</li>`).join("")}</ul>
        </div>`;
    })
    .join("");

  const sections = [
    ["auctionPhotos", "Auction Photos"],
    ["exterior", "Exterior"], ["interior", "Interior"], ["engineBay", "Engine Bay"],
    ["damageBefore", "Damage Before Repair"], ["repairDocs", "Repair Documentation"],
    ["tires", "Tires"], ["undercarriage", "Undercarriage"], ["titleDocs", "Title Documents"]
  ].filter(([key]) => car.photoSections && car.photoSections[key] && car.photoSections[key].length);

  const chipHTML = sections.map(([key, label]) => `<a href="#sec-${key}" class="chip-btn">${label}</a>`).join("");
  const sectionsHTML = sections.map(([key, label]) => `
    <div class="photo-section" id="sec-${key}">
      <h3>${label}</h3>
      <div class="photo-section__grid">${car.photoSections[key].map(src => `<img src="${src}" loading="lazy">`).join("")}</div>
    </div>`).join("");

  let videoHTML = `<div class="video-placeholder">Walkaround video coming soon — message ${BUSINESS.ownerName} to request one.</div>`;
  if (car.videoUrl) {
    if (car.videoUrl.includes("youtube.com") || car.videoUrl.includes("youtu.be") || car.videoUrl.includes("facebook.com")) {
      videoHTML = `<iframe src="${car.videoUrl}" allowfullscreen loading="lazy"></iframe>`;
    } else {
      videoHTML = `<video controls preload="metadata" src="${car.videoUrl}"></video>`;
    }
  }

  const repairedItems = (car.whatWasRepaired || "")
    .split("\n")
    .map(line => line.replace(/^[\s.\-•]+/, "").trim())
    .filter(Boolean);

  const messageHref = car.facebookUrl || BUSINESS.facebookUrl;

  root.innerHTML = `
    <div class="blob blob--chrome" style="width:400px; height:400px; top:0; right:-120px;"></div>
    <div class="container section">
      <div class="vdp">
        <div class="vdp-main-col">
          <div class="gallery">
            <div class="gallery__main">
              <img id="mainPhoto" src="${allPhotos[0] || ""}" alt="${car.year} ${car.make} ${car.model}">
            </div>
            ${allPhotos.length > 1 ? `<div class="gallery__thumbs" id="thumbRow">
              ${allPhotos.map((src, i) => `<img src="${src}" data-i="${i}" class="${i === 0 ? "is-active" : ""}">`).join("")}
            </div>` : ""}
          </div>

          <div class="video-wrap ${car.videoUrl ? "" : "video-wrap--placeholder"}" style="margin-top:20px;">${videoHTML}</div>

          <div class="divider"></div>
          <h2>About This ${car.make} ${car.model}</h2>
          <p class="lede">${car.description}</p>

          <div class="feature-grid" style="margin-top:16px;">
            <div class="feature-card"><h3>Why It Has A ${car.titleStatus}</h3><p>${car.whySalvage || ""}</p></div>
            <div class="feature-card"><h3>Known Issues</h3><p>${car.knownIssues || ""}</p></div>
            <div class="feature-card feature-card--wide">
              <h3>What Was Repaired</h3>
              <ul class="highlights-list">${repairedItems.map(item => `<li>${item}</li>`).join("")}</ul>
            </div>
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

        <div class="vdp-sidebar-col">
          <aside class="vdp-sidebar">
            <div class="tag-top ${car.status === "sold" ? "tag-top--sold" : "tag-top--available"}" style="position:static; display:inline-flex; margin-bottom:12px;">
              <span class="tag-top__dot"></span>${car.status === "sold" ? "sold" : car.titleStatus.toLowerCase()}
            </div>
            <h1 style="font-size:1.6rem;">${car.year} ${car.make} ${car.model}${car.trim ? " " + car.trim : ""}</h1>
            <div class="vdp-price">${money(car.price)}</div>
            <div class="chip-row" style="margin-top:10px;">${tagsHTML}</div>

            <dl class="vdp-specs">
              <div><dt>Mileage</dt><dd>${miles(car.mileage)}</dd></div>
              <div><dt>Engine</dt><dd>${car.engine}</dd></div>
              <div><dt>Transmission</dt><dd>${car.transmission}</dd></div>
              <div><dt>Location</dt><dd>${car.location}</dd></div>
              ${car.showVin && car.vin ? `<div style="grid-column:1/-1;"><dt>VIN</dt><dd>${car.vin}</dd></div>` : ""}
              ${car.fuelType ? `<div style="grid-column:1/-1;"><dt>Fuel Type</dt><dd>${car.fuelType}</dd></div>` : ""}
              ${car.exteriorColor ? `<div style="grid-column:1/-1;"><dt>Exterior Color</dt><dd>${car.exteriorColor}</dd></div>` : ""}
              ${car.interiorColor ? `<div style="grid-column:1/-1;"><dt>Interior Color</dt><dd>${car.interiorColor}</dd></div>` : ""}
              ${car.interiorMaterial ? `<div style="grid-column:1/-1;"><dt>Interior Material</dt><dd>${car.interiorMaterial}</dd></div>` : ""}
              ${car.mpg ? `<div style="grid-column:1/-1;"><dt>Fuel Economy</dt><dd>${car.mpg}</dd></div>` : ""}
            </dl>

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
              <a href="index.html" class="btn btn--orange btn--block">View Available Cars</a>
            </div>`}
          </aside>

          ${chipHTML ? `<div class="section-nav-chips">${chipHTML}</div>` : ""}
          ${sectionsHTML}
        </div>
      </div>
    </div>
  `;

  const mainPhoto = document.getElementById("mainPhoto");
  if (mainPhoto) {
    mainPhoto.addEventListener("click", () => openLightbox(mainPhoto.src));
  }

  if (allPhotos.length > 1) {
    document.getElementById("thumbRow").addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      mainPhoto.src = img.src;
      document.querySelectorAll("#thumbRow img").forEach(t => t.classList.remove("is-active"));
      img.classList.add("is-active");
    });
  }

  root.querySelectorAll(".photo-section__grid img").forEach(img => {
    img.addEventListener("click", () => openLightbox(img.src));
  });
}

/* ---------------- Lightbox (click a photo-section image to enlarge) ---------------- */

function openLightbox(src) {
  let overlay = document.getElementById("lightboxOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "lightboxOverlay";
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = `<img id="lightboxImg" alt="">`;
    overlay.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
    document.body.appendChild(overlay);
  }
  document.getElementById("lightboxImg").src = src;
  overlay.classList.add("is-open");
}

function closeLightbox() {
  const overlay = document.getElementById("lightboxOverlay");
  if (overlay) overlay.classList.remove("is-open");
}
