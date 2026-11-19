/* =========================================================
   Emily Vitasya Haloho | Portfolio Script (Vanilla JS)

   Untuk mengisi Sertifikat dan Writing, edit array di bawah.
   Kalau array kosong, bagian tersebut otomatis disembunyikan.
   ========================================================= */

/* ---------- Project data ---------- */
const PROJECTS = [
  {
    id: "project-1",
    title: "Blue Bird Fleet Productivity & Corporate eVoucher Analysis",
    category: "Data Analysis",
    shortDesc: "Capstone analysis of idle drivers, failed ride requests, and corporate eVoucher usage for a conventional taxi operator, based on three months of operational data.",
    role: "Built the analysis end to end in Python and SQL: cleaned six operational tables (trips, requests, shifts, drivers, pools, and corporate clients), then measured unserved demand, driver idle time, and corporate eVoucher usage patterns, with written interpretation for each step.",
    problem: "Why do many Blue Bird drivers sit idle while some customers cannot get a taxi? The project tests where and when demand goes unserved, how idle time is distributed, and whether corporate eVoucher usage shows patterns that need verification.",
    tools: ["Python", "Pandas", "MySQL", "SciPy", "Statsmodels", "Jupyter Notebook"],
    findings: [
      "Failed requests concentrate in the CBD during rush hours: 36.6% of requests failed in the 07–08 and 17–18 windows, compared with 6.7% across all requests (19,397 of 289,622).",
      "Drivers are highly idle: an average of 1.26 trips per shift, 30.6% of shifts had no trips, and overall utilisation was 9.4%.",
      "Airport eVoucher corporate trips occur at night or on weekends 65.9% of the time, compared with 22.6% for non-B2B airport trips. This is a pattern to verify, not evidence of misuse."
    ],
    link: "https://github.com/emilyvitasya/bluebird-data-analysis",
    dashboardUrl: "https://public.tableau.com/app/profile/emily.vitasya/viz/Blue_17936873988940/MonitoringRitaseRequest?publish=yes"
  },
  {
    id: "project-2",
    title: "E-Commerce Customer Churn Prediction",
    category: "Data Science",
    shortDesc: "Binary classification model that flags e-commerce customers at risk of churning, so retention budget reaches the right people.",
    role: "Built the full modelling pipeline in one notebook: data cleaning, EDA, feature engineering, SMOTE applied inside the cross-validation pipeline, benchmarking of six algorithms with 5-fold CV, hyperparameter tuning, threshold selection through cost-benefit analysis, bootstrap confidence intervals, and SHAP interpretation.",
    problem: "Acquiring new customers costs more than retaining existing ones. Without a prediction model, the business either does nothing or offers promotions to everyone, which wastes budget. This project identifies at-risk customers so retention campaigns can be targeted, with a cost-benefit analysis to measure the financial impact.",
    tools: ["Python", "LightGBM", "XGBoost", "scikit-learn", "imbalanced-learn", "SHAP", "Jupyter Notebook"],
    findings: [
      "The final LightGBM model reaches 89.7% recall and 67.6% precision on the test set, with ROC-AUC of 0.956. Both exceed the success targets even at the lower confidence bound.",
      "Compared with a campaign to all customers, targeting only flagged customers saves about Rp 24 million on the test set (simulated, using illustrative cost assumptions).",
      "Short tenure and complaints are the strongest churn signals: churn is 55.7% for customers with 0 months of tenure and 31.4% for customers who filed a complaint, versus 10.6% for those who did not."
    ],
    link: "https://github.com/emilyvitasya/ecommerce-churn-classification-model"
  },
  {
    id: "project-3",
    title: "World Happiness Report: Indonesia Descriptive Statistics",
    category: "Statistical Analysis",
    shortDesc: "Descriptive statistics, distribution analysis, and correlation study of Indonesia's life satisfaction scores from 2021 to 2025, benchmarked against the global average and ASEAN peers.",
    role: "Prepared and analyzed World Happiness Report data for Indonesia from 2021 to 2025, covering central tendency, dispersion, distribution, and correlation, and compared Indonesia with the global average and ASEAN peers, with written interpretation at each step.",
    problem: "How has Indonesia's life satisfaction changed over the past five years, how does it compare with the global average and ASEAN countries, and which factors move alongside it?",
    tools: ["Python", "Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    findings: [
      "Indonesia's Life Ladder score rose from 5.24 in 2021 to 5.62 in 2025, an increase of 7.2%, with the largest single-year jump between 2022 and 2023. Its global rank stayed between 80 and 87 throughout the period.",
      "Freedom to make life choices contributed the largest increase to the score between 2021 and 2025 (+0.42), followed by Social support (+0.35). Generosity declined (−0.17). With only five annual observations, these are descriptive patterns, not statistically confirmed relationships.",
      "Indonesia's Life Ladder score sits close to the global average, and its variability over the period is low (standard deviation of 0.19 for 2021–2025), suggesting stable results year to year."
    ],
    link: "https://github.com/emilyvitasya/WorldHappinessReport_Indonesia"
  },
  {
    id: "project-4",
    title: "Tokopedia E-Commerce Data Cleaning & EDA",
    category: "Data Analysis",
    shortDesc: "Data cleaning, feature engineering, and exploratory analysis of e-commerce transactions, users, and deliveries.",
    role: "Identified and documented data quality problems across three linked datasets (users, transactions, deliveries) before any analysis, including invalid values and inconsistent labels.",
    problem: "E-commerce data from a legacy system often contains inconsistent labels, impossible values, and broken relationships between tables. This project cleans the data and uses it to answer business questions about GMV, promotions, repeat buying, and delivery performance.",
    tools: ["Python", "Pandas", "NumPy"],
    findings: [
      "Found 2,968 transactions with a total_amount of 999,999,999, which looks like a placeholder value rather than a real amount, and 3,032 transactions with negative amounts.",
      "Payment method labels are inconsistent, with variants such as GoPay, gopay, and GO-PAY that need to be standardized before any payment analysis."
    ],
    link: "https://github.com/emilyvitasya/data_analysis-_project_tokopedia"
  }
];

/* ---------- Sertifikat ----------
   Contoh isi (hapus tanda // jika ingin dipakai):
   { title: "Google Data Analytics Certificate", issuer: "Google / Coursera", year: "2024", link: "https://..." }
*/
const CERTIFICATIONS = [
  // isi di sini
];

/* ---------- Writing ----------
   Contoh isi:
   { title: "Judul artikel", platform: "Medium", year: "2025", link: "https://..." }
*/
const WRITINGS = [
  // isi di sini
];

/* ---------- Helpers ---------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ---------- Footer year ---------- */
function setYear() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Profile image fallback ---------- */
function setupProfileFallback() {
  const img = $(".profile-img");
  const frame = $(".photo-frame");
  if (!img || !frame) return;

  frame.dataset.initials = img.dataset.fallback || "EH";

  const showFallback = () => {
    img.classList.add("is-missing");
    frame.classList.add("is-fallback");
  };

  img.addEventListener("error", showFallback);
  if (img.complete && img.naturalWidth === 0) showFallback();
}

/* ---------- Navbar: sticky shadow, hamburger, active link ---------- */
function setupNavbar() {
  const navbar = $("#navbar");
  const hamburger = $("#hamburger");
  const navMenu = $("#nav-menu");
  if (!navbar || !hamburger || !navMenu) return;

  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenuOpen = (open) => {
    hamburger.classList.toggle("active", open);
    navMenu.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  };

  hamburger.addEventListener("click", () => {
    setMenuOpen(!navMenu.classList.contains("open"));
  });

  $$(".nav-link", navMenu).forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenuOpen(false);
  });
}

function setupActiveLink() {
  const links = $$(".nav-link");
  const sections = links
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);
  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Theme toggle (light / dark) ---------- */
function setupThemeToggle() {
  const btn = $("#theme-toggle");
  if (!btn) return;

  const apply = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {}
  };

  apply(document.documentElement.getAttribute("data-theme") === "dark");

  btn.addEventListener("click", () => {
    apply(document.documentElement.getAttribute("data-theme") !== "dark");
  });
}

/* ---------- Back to top button ---------- */
function setupBackToTop() {
  const btn = $("#back-to-top");
  if (!btn) return;

  const onScroll = () => btn.classList.toggle("is-visible", window.scrollY > 400);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
}

/* ---------- Scroll reveal ---------- */
function setupReveal() {
  const selectors = [
    ".section-header",
    ".skill-card",
    ".project-card",
    ".about-highlights li",
    ".timeline-item",
    ".contact-card",
    ".cert-card",
    ".writing-card"
  ];
  const targets = $$(selectors.join(","));
  if (targets.length === 0) return;

  targets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- Dashboard: animasi bar saat section terlihat ---------- */
function setupDashboardAnimation() {
  const grid = $("#chart-grid");
  if (!grid || !("IntersectionObserver" in window)) {
    if (grid) grid.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        grid.classList.add("is-visible");
        observer.disconnect();
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(grid);
}

/* ---------- Sertifikat & Writing ---------- */
function renderCertifications() {
  const section = $("#certifications");
  const grid = $("#cert-grid");
  if (!section || !grid || CERTIFICATIONS.length === 0) return;

  grid.innerHTML = CERTIFICATIONS.map(
    (c) => `
      <a class="cert-card" href="${escapeHtml(c.link || "#")}" target="_blank" rel="noopener noreferrer">
        <span class="card-meta">${escapeHtml(c.issuer)} · ${escapeHtml(c.year)}</span>
        <h3>${escapeHtml(c.title)}</h3>
      </a>`
  ).join("");

  section.hidden = false;
}

function renderWritings() {
  const section = $("#writing");
  const grid = $("#writing-grid");
  if (!section || !grid || WRITINGS.length === 0) return;

  grid.innerHTML = WRITINGS.map(
    (w) => `
      <a class="writing-card" href="${escapeHtml(w.link || "#")}" target="_blank" rel="noopener noreferrer">
        <span class="card-meta">${escapeHtml(w.platform)} · ${escapeHtml(w.year)}</span>
        <h3>${escapeHtml(w.title)}</h3>
      </a>`
  ).join("");

  section.hidden = false;
}

/* ---------- Projects: render cards ---------- */
function renderProjects() {
  const grid = $("#projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(
    (p) => `
      <article class="project-card">
        <span class="eyebrow">${escapeHtml(p.category)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p class="project-desc">${escapeHtml(p.shortDesc)}</p>
        <div class="badges">
          ${p.tools.slice(0, 4).map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join("")}
          ${p.tools.length > 4 ? `<span class="badge">+${p.tools.length - 4}</span>` : ""}
        </div>
        <button type="button" class="btn btn-outline project-open" data-id="${escapeHtml(p.id)}">
          View details
        </button>
      </article>`
  ).join("");
}

/* ---------- Project modal ---------- */
let lastFocusedElement = null;

function openModal(id) {
  const project = PROJECTS.find((p) => p.id === id);
  const modal = $("#project-modal");
  if (!project || !modal) return;

  $("#modal-category").textContent = project.category;
  $("#modal-title").textContent = project.title;
  $("#modal-role").textContent = project.role;
  $("#modal-problem").textContent = project.problem;

  $("#modal-tools").innerHTML = project.tools
    .map((t) => `<span class="badge">${escapeHtml(t)}</span>`)
    .join("");

  $("#modal-findings").innerHTML = project.findings
    .map((f) => `<li>${escapeHtml(f)}</li>`)
    .join("");

  const link = $("#modal-link");
  link.href = project.link || "#";
  link.hidden = !project.link;

  const dashLink = $("#modal-dashboard");
  if (dashLink) {
    dashLink.href = project.dashboardUrl || "#";
    dashLink.hidden = !project.dashboardUrl;
  }

  lastFocusedElement = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  $(".modal-close", modal).focus();
}

function closeModal() {
  const modal = $("#project-modal");
  if (!modal || !modal.classList.contains("open")) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) lastFocusedElement.focus();
}

function setupModal() {
  const modal = $("#project-modal");
  const grid = $("#projects-grid");
  if (!modal) return;

  if (grid) {
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".project-open");
      if (btn) openModal(btn.dataset.id);
    });
  }

  $$("[data-close]", modal).forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js");
  setYear();
  setupProfileFallback();
  setupNavbar();
  setupActiveLink();
  setupThemeToggle();
  setupBackToTop();
  renderProjects();
  renderCertifications();
  renderWritings();
  setupModal();
  setupReveal();
  setupDashboardAnimation();
});