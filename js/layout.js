/* ============================================================
   SHARED HEADER + FOOTER
   Edit nav links or footer once here, updates every page.
   ============================================================ */

const NAV_LINKS = [
  { href: "index.html", label: "Cars" },
  { href: "titles.html", label: "Salvage & Rebuilt Titles" },
  { href: "sourcing.html", label: "How I Source Cars" },
  { href: "customer-map.html", label: "Customer Map" },
  { href: "about.html", label: "About" },
  { href: "contact.html", label: "Contact" }
];

function currentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path;
}

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const page = currentPage();
  const links = NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${page === l.href ? "is-active" : ""}">${l.label}</a>`
  ).join("");

  el.innerHTML = `
    <div class="container nav__row">
      <a href="index.html" class="brand">${BUSINESS.name}</a>
      <button class="nav-toggle" id="navToggle" aria-label="Menu">MENU</button>
    </div>
    <nav class="nav__links" id="mainNav">${links}</nav>
  `;

  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
    <div class="container footer-row">
      <div class="mono">${BUSINESS.name.toLowerCase()} &middot; ${BUSINESS.location.toLowerCase()}</div>
      <div style="display:flex; gap:20px;">
        <a href="${BUSINESS.facebookUrl}" target="_blank" rel="noopener">facebook</a>
        <a href="mailto:${BUSINESS.email}">email</a>
      </div>
    </div>
    <img src="images/pablo-head.png" alt="" title="you found him" class="footer-egg">
  `;
}

/* Header/footer are rendered explicitly by each page after loadSiteData()
   resolves — see the bottom of each HTML file. */
