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

/* Reassurance badges shown on the vehicle detail page when the
   matching Condition & Ownership toggle is checked "yes". */
const TRUST_BADGES = [
  ["conditionFeatures", "noAirbagsDeployed", "No Airbags Deployed"],
  ["conditionFeatures", "noFrameDamage", "No Frame Damage"],
  ["conditionFeatures", "noGlassBroken", "No Glass Broken"]
];
const TRUST_BADGE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`;

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

/* Just Arrived (available) first, with a "Sold" divider before the sold
   archive — unless ?view=available is set (from the "View Available
   Cars" link on a sold car's page), in which case sold cars are omitted
   entirely. */
function renderHomeFeed() {
  const root = document.getElementById("carFeedRoot");
  if (!root) return;

  const hasOrder = c => c.sortOrder !== undefined && c.sortOrder !== null && c.sortOrder !== "";
  const available = CARS.filter(c => c.status === "available").sort((a, b) => {
    if (hasOrder(a) && hasOrder(b)) return a.sortOrder - b.sortOrder;
    if (hasOrder(a)) return -1;
    if (hasOrder(b)) return 1;
    return new Date(b.dateAdded||0) - new Date(a.dateAdded||0);
  });
  const sold = CARS.filter(c => c.status === "sold").sort((a,b) => new Date(b.dateSold||0) - new Date(a.dateSold||0));

  const availableOnly = new URLSearchParams(window.location.search).get("view") === "available";

  let html = `
    <div class="feed-heading"><h2>Just Arrived</h2></div>
    ${cardsOrEmptyState(available)}
  `;

  if (!availableOnly && sold.length) {
    const SOLD_PREVIEW_COUNT = 3;
    html += `
      <div class="feed-heading" style="margin-top:52px;"><h2>Recently Sold</h2></div>
      ${cardsOrEmptyState(sold.slice(0, SOLD_PREVIEW_COUNT))}
      ${sold.length > SOLD_PREVIEW_COUNT ? `
        <div class="text-center" style="margin-top:24px;">
          <a href="sold.html" class="btn btn--glass">View All Sold Vehicles</a>
        </div>` : ""}
    `;
  }

  root.innerHTML = html;
}

/* Full list of every sold car, for sold.html */
function renderSoldFeed() {
  const root = document.getElementById("carFeedRoot");
  if (!root) return;
  const sold = CARS.filter(c => c.status === "sold").sort((a,b) => new Date(b.dateSold||0) - new Date(a.dateSold||0));
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

  const trustBadgesHTML = TRUST_BADGES
    .filter(([catKey, itemKey]) => car[catKey] && car[catKey][itemKey])
    .map(([, , label]) => `
      <div class="trust-badge">
        <div class="trust-badge__icon">${TRUST_BADGE_ICON}</div>
        <div class="trust-badge__label">${label}</div>
      </div>`)
    .join("");

  const SLIDER_SECTIONS = new Set(["auctionPhotos", "deepCleaning"]);
  const sections = [
    ["auctionPhotos", "Auction Photos"],
    ["deepCleaning", "Deep Cleaning"],
    ["exterior", "Exterior"], ["interior", "Interior"], ["engineBay", "Engine Bay"],
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
    <div class="blob blob--chrome" style="width:400px; height:400px; top:0; right:-120px; position:fixed;"></div>
    <div class="container section">
      <div class="vdp">
        <div class="vdp-photos-col">
          <div class="gallery">
            <div class="gallery__main">
              <img id="mainPhoto" src="${allPhotos[0] || ""}" alt="${car.year} ${car.make} ${car.model}">
              ${allPhotos.length > 1 ? `
                <button class="gallery__arrow gallery__arrow--prev is-disabled" id="mainPrevBtn" aria-label="Previous photo">&#8249;</button>
                <button class="gallery__arrow gallery__arrow--next" id="mainNextBtn" aria-label="Next photo">&#8250;</button>
              ` : ""}
            </div>
            ${allPhotos.length > 1 ? `<div class="gallery__thumbs" id="thumbRow">
              ${allPhotos.map((src, i) => `<img src="${src}" data-i="${i}" class="${i === 0 ? "is-active" : ""}">`).join("")}
            </div>` : ""}
          </div>

          <div class="video-wrap ${car.videoUrl ? "" : "video-wrap--placeholder"}" style="margin-top:20px;">${videoHTML}</div>
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
              <div class="vdp-spec--featured"><dt>Mileage</dt><dd>${miles(car.mileage)}</dd></div>
              <div><dt>Engine</dt><dd>${car.engine}</dd></div>
              <div><dt>Transmission</dt><dd>${car.transmission}</dd></div>
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
            <div class="feature-card"><h3>Why It Has A ${car.titleStatus}</h3><p>${car.whySalvage || ""}</p></div>
            <div class="feature-card"><h3>Known Issues</h3><p>${car.knownIssues || ""}</p></div>
            <div class="feature-card feature-card--wide">
              <h3>What Was Repaired</h3>
              <ul class="highlights-list highlights-list--repaired">${repairedItems.map(item => `<li>${item}</li>`).join("")}</ul>
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
      </div>
    </div>
  `;

  const mainPhoto = document.getElementById("mainPhoto");
  let currentMainIndex = 0;
  if (mainPhoto) {
    mainPhoto.addEventListener("click", () => openLightbox(allPhotos, currentMainIndex));
  }

  if (allPhotos.length > 1) {
    const mainPrevBtn = document.getElementById("mainPrevBtn");
    const mainNextBtn = document.getElementById("mainNextBtn");

    function goToMainPhoto(i) {
      currentMainIndex = Math.max(0, Math.min(allPhotos.length - 1, i));
      mainPhoto.src = allPhotos[currentMainIndex];
      document.querySelectorAll("#thumbRow img").forEach((t, idx) => t.classList.toggle("is-active", idx === currentMainIndex));
      if (mainPrevBtn) mainPrevBtn.classList.toggle("is-disabled", currentMainIndex === 0);
      if (mainNextBtn) mainNextBtn.classList.toggle("is-disabled", currentMainIndex === allPhotos.length - 1);
    }

    enableDragScroll(document.getElementById("thumbRow"));

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
  thumbs.forEach((thumb, i) => thumb.addEventListener("click", () => goToPage(Math.floor(i / SLIDER_PAGE_SIZE))));
  frameImgs.forEach((img, i) => img.addEventListener("click", () => openLightbox(allSrcs, i)));
}

/* ---------------- Lightbox (click a photo to enlarge, arrow keys to move
   between the photos in that same gallery/section, Escape to close) ---------------- */

let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  let overlay = document.getElementById("lightboxOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "lightboxOverlay";
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = `<img id="lightboxImg" alt="">`;
    overlay.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", handleLightboxKeydown);
    document.body.appendChild(overlay);
  }
  showLightboxImage();
  overlay.classList.add("is-open");
}

function showLightboxImage() {
  document.getElementById("lightboxImg").src = lightboxImages[lightboxIndex];
}

function handleLightboxKeydown(e) {
  const overlay = document.getElementById("lightboxOverlay");
  if (!overlay || !overlay.classList.contains("is-open")) return;
  if (e.key === "Escape") { closeLightbox(); return; }
  if (!lightboxImages.length) return;
  if (e.key === "ArrowRight") { lightboxIndex = (lightboxIndex + 1) % lightboxImages.length; showLightboxImage(); }
  if (e.key === "ArrowLeft") { lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length; showLightboxImage(); }
}

function closeLightbox() {
  const overlay = document.getElementById("lightboxOverlay");
  if (overlay) overlay.classList.remove("is-open");
}
