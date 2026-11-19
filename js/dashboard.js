/* =========================================================
   Dashboard section: KPI cards and CSS bar charts

   Angka hanya diambil dari output notebook yang sudah dicek.

   CATATAN SINKRONISASI:
   - Setiap proyek yang punya dashboard harus punya entri di DASHBOARDS.
   - Saat ini: churn, bluebird, whr.
   - Proyek Tokopedia (project-4) belum punya dashboard.
   ========================================================= */

const DASHBOARDS = {
  churn: {
    label: "E-Commerce Churn Prediction",
    kpis: [
      { label: "Model recall (test set)", value: "89.7%", note: "Target ≥ 70%" },
      { label: "Model precision (test set)", value: "67.6%", note: "Target ≥ 50%" },
      { label: "ROC-AUC", value: "0.956", note: "Final LightGBM model" },
      { label: "Simulated saving vs. campaign to all (test set)", value: "Rp 24 jt", note: "Illustrative cost assumptions, not actual revenue" }
    ],
    charts: [
      {
        title: "Churn rate by complaint status",
        unit: "%",
        bars: [
          { label: "Filed a complaint", value: 31.4 },
          { label: "No complaint", value: 10.6 }
        ]
      },
      {
        title: "Churn rate by tenure",
        unit: "%",
        note: "Hanya dua kelompok ditampilkan. Rentang tengah (1–24 bulan) perlu ditambahkan dari notebook.",
        bars: [
          { label: "0 months", value: 55.7 },
          { label: "Over 24 months", value: 0, emptyNote: "0% (tidak ada churn pada kelompok ini)" }
        ]
      }
    ]
  },

  bluebird: {
    label: "Blue Bird Fleet Productivity",
    kpis: [
      { label: "Failed requests, CBD rush hour", value: "36.6%", note: "vs 6.7% overall" },
      { label: "Trips per shift", value: "1.26", note: "Average" },
      { label: "Shifts with no trips", value: "30.6%", note: "Share of all shifts" },
      { label: "Driver utilisation", value: "9.4%", note: "Overall" }
    ],
    charts: [
      {
        title: "Failed request rate: CBD rush hour vs all",
        unit: "%",
        bars: [
          { label: "CBD, rush hour", value: 36.6 },
          { label: "All requests", value: 6.7 }
        ]
      },
      {
        title: "Airport trips at night or weekend",
        unit: "%",
        note: "Pola yang perlu diverifikasi, bukan bukti penyalahgunaan.",
        bars: [
          { label: "Corporate eVoucher", value: 65.9 },
          { label: "Non-B2B", value: 22.6 }
        ]
      }
    ]
  },

  whr: {
    label: "World Happiness Report: Indonesia",
    kpis: [
      { label: "Life Ladder 2025", value: "5.62", note: "Up from 5.24 in 2021" },
      { label: "Change 2021–2025", value: "+7.2%", note: "Life Ladder" },
      { label: "Global rank range", value: "#80–#87", note: "2021–2025" },
      { label: "Std. dev. 2021–2025", value: "0.19", note: "Low variability" }
    ],
    charts: [
      {
        title: "Change in score, 2021 to 2025",
        unit: "pts",
        signed: true,
        note: "Garis tengah = tidak ada perubahan. Bar ke kanan = naik, ke kiri = turun.",
        bars: [
          { label: "Freedom to make life choices", value: 0.42 },
          { label: "Social support", value: 0.35 },
          { label: "Generosity", value: -0.17 }
        ]
      }
    ]
  }
};

/* ---------- Helpers ---------- */
function dashEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatValue(chart, value) {
  const sign = chart.signed && value > 0 ? "+" : "";
  const suffix = chart.unit === "%" ? "%" : ` ${chart.unit}`;
  return `${sign}${value}${suffix}`;
}

/* ---------- Render ---------- */
function renderKpis(kpis) {
  return kpis
    .map(
      (k) => `
        <div class="kpi-card">
          <span class="kpi-label">${dashEscape(k.label)}</span>
          <span class="kpi-value">${dashEscape(k.value)}</span>
          <span class="kpi-note">${dashEscape(k.note)}</span>
        </div>`
    )
    .join("");
}

function renderBars(chart) {
  const maxAbs = Math.max(...chart.bars.map((b) => Math.abs(b.value))) || 1;
  const hasNegative = chart.bars.some((b) => b.value < 0);

  return chart.bars
    .map((b) => {
      const width = (Math.abs(b.value) / maxAbs) * 100;
      const isNegative = b.value < 0;
      const fillClass = isNegative ? "bar-fill is-negative" : "bar-fill";
      const valueText = formatValue(chart, b.value);
      const emptyNote =
        b.value === 0 && b.emptyNote
          ? `<span class="bar-empty-note">${dashEscape(b.emptyNote)}</span>`
          : "";

      let fillStyle;
      if (hasNegative) {
        const half = width / 2;
        fillStyle = isNegative
          ? `width: ${half}%; left: ${50 - half}%;`
          : `width: ${half}%; left: 50%;`;
      } else {
        fillStyle = `width: ${width}%; left: 0;`;
      }

      return `
          <div class="bar-row">
            <span class="bar-label">${dashEscape(b.label)}</span>
            <div class="bar-track ${hasNegative ? "has-midline" : ""}"
                 role="img"
                 aria-label="${dashEscape(b.label)}: ${dashEscape(valueText)}">
              <div class="${fillClass}" style="${fillStyle}"></div>
            </div>
            <span class="bar-value">${dashEscape(valueText)}${emptyNote}</span>
          </div>`;
    })
    .join("");
}

function renderCharts(charts) {
  return charts
    .map(
      (chart) => `
        <div class="chart-card">
          <h3>${dashEscape(chart.title)}</h3>
          ${chart.note ? `<p class="chart-note">${dashEscape(chart.note)}</p>` : ""}
          ${renderBars(chart)}
        </div>`
    )
    .join("");
}

function renderDashboard(key) {
  const data = DASHBOARDS[key];
  const kpiRow = document.getElementById("kpi-row");
  const chartGrid = document.getElementById("chart-grid");

  if (!data || !kpiRow || !chartGrid) {
    console.warn("[dashboard] Data atau elemen tidak ditemukan:", key);
    return;
  }

  kpiRow.innerHTML = renderKpis(data.kpis);
  chartGrid.innerHTML = renderCharts(data.charts);
}

/* ---------- Init ---------- */
function initDashboard() {
  const select = document.getElementById("dash-select");
  if (!select) {
    console.warn("[dashboard] Elemen #dash-select tidak ditemukan di index.html");
    return;
  }

  select.innerHTML = Object.entries(DASHBOARDS)
    .map(([key, d]) => `<option value="${dashEscape(key)}">${dashEscape(d.label)}</option>`)
    .join("");

  select.addEventListener("change", () => renderDashboard(select.value));
  renderDashboard(select.value);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDashboard);
} else {
  initDashboard();
}