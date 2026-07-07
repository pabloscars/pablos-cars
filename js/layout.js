/* ============================================================
   SHARED HEADER + FOOTER
   Edit nav links or footer once here, updates every page.
   ============================================================ */

const NAV_LINKS = [
  { href: "index.html", label: "Cars" },
  { href: "how-to-buy.html", label: "How to Buy" },
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

// Normalizes away a trailing ".html" so page comparisons still work when a
// dev server (or Netlify's clean-URL fallback) serves a page without its
// extension in the address bar.
function stripHtml(page) {
  return page.replace(/\.html$/, "") || "index";
}

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const page = stripHtml(currentPage());
  const links = NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${page === stripHtml(l.href) ? "is-active" : ""}">${l.label}</a>`
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

  renderBuyCTA();
}

/* Always-present floating "I Want To Buy This Car" sticker — links to the
   How to Buy walkthrough. Injected once per page load; hidden on the
   walkthrough page itself since it'd just link to the page you're on. */
function renderBuyCTA() {
  if (document.getElementById("buyCta")) return;
  if (stripHtml(currentPage()) === "how-to-buy") return;

  const a = document.createElement("a");
  a.id = "buyCta";
  a.href = "how-to-buy.html";
  a.className = "buy-cta";
  a.innerHTML = `
    <svg class="buy-cta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
    <span>I Want To Buy This Car</span>
  `;
  document.body.appendChild(a);
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
