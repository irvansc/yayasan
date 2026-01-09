/**
 * CORE SCRIPT (GLOBAL)
 * Digunakan di seluruh halaman website.
 */

/* --- 1. DARK MODE LOGIC --- */
const themeToggleDarkIcon = document.querySelectorAll(".fa-moon");
const themeToggleLightIcon = document.querySelectorAll(".fa-sun");
const themeToggleBtns = [
  document.getElementById("theme-toggle-desktop"),
  document.getElementById("theme-toggle-mobile"),
];

function toggleTheme() {
  themeToggleDarkIcon.forEach((el) => el.classList.toggle("hidden"));
  themeToggleLightIcon.forEach((el) => el.classList.toggle("hidden"));

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

themeToggleBtns.forEach((btn) => {
  if (btn) btn.addEventListener("click", toggleTheme);
});

// Sync icons on load
if (document.documentElement.classList.contains("dark")) {
  themeToggleDarkIcon.forEach((el) => el.classList.add("hidden"));
  themeToggleLightIcon.forEach((el) => el.classList.remove("hidden"));
} else {
  themeToggleDarkIcon.forEach((el) => el.classList.remove("hidden"));
  themeToggleLightIcon.forEach((el) => el.classList.add("hidden"));
}

/* --- 2. SIDEBAR NAVIGATION (MOBILE) --- */
const btn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("mobile-sidebar");
const backdrop = document.getElementById("mobile-backdrop");

function toggleSidebar() {
  if (!sidebar || !backdrop) return; // Guard clause
  const isClosed = sidebar.classList.contains("-translate-x-full");
  if (isClosed) {
    sidebar.classList.remove("-translate-x-full");
    backdrop.classList.remove("opacity-0", "invisible");
    document.body.style.overflow = "hidden";
  } else {
    sidebar.classList.add("-translate-x-full");
    backdrop.classList.add("opacity-0", "invisible");
    document.body.style.overflow = "";
  }
}

if (btn) btn.addEventListener("click", toggleSidebar);

// Accordion Logic (Submenu)
function toggleSub(menuId, arrowId) {
  const menu = document.getElementById(menuId);
  const arrow = document.getElementById(arrowId);
  if (!menu || !arrow) return;

  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    menu.classList.add("block");
    arrow.classList.add("rotate-90");
  } else {
    menu.classList.add("hidden");
    menu.classList.remove("block");
    arrow.classList.remove("rotate-90");
  }
}

/* --- 3. NAVBAR SCROLL EFFECT --- */
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add(
        "shadow-md",
        "bg-white/95",
        "dark:bg-dark-bg/95",
        "py-0"
      );
      navbar.classList.remove("glass-effect");
    } else {
      navbar.classList.remove(
        "shadow-md",
        "bg-white/95",
        "dark:bg-dark-bg/95",
        "py-0"
      );
      navbar.classList.add("glass-effect");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const activeClasses = [
    "bg-primary-50",
    "text-primary-700",
    "font-bold",
    "shadow-sm",
    "active",
  ];

  // PERBAIKAN DI SINI: Menambahkan semua kemungkinan class inactive/hover yang ada di HTML
  const inactiveClasses = [
    "text-slate-600",
    "dark:text-slate-300",
    "hover:text-primary-600",
    "hover:bg-white/80",
    "hover:bg-slate-50", // <-- Penting: Class ini ada di HTML mobile Anda
    "dark:hover:bg-slate-700",
    "dark:hover:bg-slate-800", // <-- Penting: Class ini ada di HTML mobile Anda
    "font-semibold",
    "font-medium", // <-- Penting: HTML Anda pakai medium, bukan semibold
  ];

  /**
   * @param {Object} config
   * @param {string} config.selector
   * @param {string[]} config.indexPages
   * @param {boolean} config.usePill
   * @param {boolean} config.useDropdown
   * @param {boolean} config.parentUsePill
   */
  function initActiveMenu({
    selector,
    indexPages = [],
    usePill = false,
    useDropdown = false,
    parentUsePill = false,
  }) {
    document.querySelectorAll(selector).forEach((link) => {
      const href = link.getAttribute("href");
      const isIndex = indexPages.includes(currentPage);
      const isActive =
        href === currentPage ||
        (isIndex && ["/", "./", ...indexPages].includes(href));

      if (isActive) {
        link.classList.add("active");

        if (usePill) {
          link.classList.add(...activeClasses);
          link.classList.remove(...inactiveClasses);
        }

        if (useDropdown) {
          const parent = link.closest(".group");
          const btn = parent?.querySelector("button");

          if (btn) {
            btn.classList.add("active");

            if (usePill || parentUsePill) {
              btn.classList.add(...activeClasses);
              // INI KUNCINYA: Menghapus class hover agar tidak menimpa warna hijau
              btn.classList.remove(...inactiveClasses);
            } else {
              btn.classList.add("text-primary-600", "font-bold");
              btn.classList.remove("text-slate-700", "dark:text-slate-200");
            }
          }
        }
      } else if (usePill) {
        link.classList.remove(...activeClasses);
        link.classList.add(...inactiveClasses);
      }
    });
  }

  /* ================= CONFIG ================= */

  // YAYASAN
  initActiveMenu({
    selector: ".desktop-link, .mobile-nav-link, .dropdown-link",
    indexPages: ["index.html", ""],
    useDropdown: true,
  });

  // SD - MENU UTAMA
  initActiveMenu({
    selector: ".desktop-link-sd, .mobile-nav-link-sd",
    indexPages: ["sd_index.html", ""],
    usePill: true,
    useDropdown: true,
  });

  // SD - SUBMENU DROPDOWN
  initActiveMenu({
    selector: ".dropdown-link-sd",
    indexPages: [],
    usePill: false,
    useDropdown: true,
    parentUsePill: true,
  });
});

// --- SCROLL TO TOP LOGIC ---
const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  // Jika scroll lebih dari 300px, munculkan tombol
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("opacity-0", "invisible", "translate-y-10");
    scrollBtn.classList.add("opacity-100", "visible", "translate-y-0");
  } else {
    // Jika di atas, sembunyikan tombol
    scrollBtn.classList.add("opacity-0", "invisible", "translate-y-10");
    scrollBtn.classList.remove("opacity-100", "visible", "translate-y-0");
  }
});
