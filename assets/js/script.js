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
        "py-0",
      );
      navbar.classList.remove("glass-effect");
    } else {
      navbar.classList.remove(
        "shadow-md",
        "bg-white/95",
        "dark:bg-dark-bg/95",
        "py-0",
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
    selector: ".mobile-nav-link, .dropdown-link",
    indexPages: ["index.html", ""],
    useDropdown: true,
    parentUsePill: true,
  });
  initActiveMenu({
    selector: ".desktop-link",
    indexPages: ["index.html", ""],
    useDropdown: true,
    parentUsePill: false,
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
  // SMP - MENU UTAMA
  initActiveMenu({
    selector: ".desktop-link-smp, .mobile-nav-link-smp",
    indexPages: ["smp_index.html", ""],
    usePill: true,
    useDropdown: true,
  });

  // SMP - SUBMENU DROPDOWN
  initActiveMenu({
    selector: ".dropdown-link-smp",
    indexPages: [],
    usePill: false,
    useDropdown: true,
    parentUsePill: true,
  });
  // SMA - MENU UTAMA
  initActiveMenu({
    selector: ".desktop-link-sma, .mobile-nav-link-sma",
    indexPages: ["sma_index.html", ""],
    usePill: true,
    useDropdown: true,
  });

  // SMA - SUBMENU DROPDOWN
  initActiveMenu({
    selector: ".dropdown-link-sma",
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

/* --- SEARCH MODAL LOGIC --- */
const searchModal = document.getElementById("search-modal");
const searchInput = document.getElementById("search-input");

function toggleSearch() {
  // Toggle Classes untuk Visibilitas
  if (searchModal.classList.contains("invisible")) {
    // Buka Modal
    searchModal.classList.remove("invisible", "opacity-0", "scale-95");
    searchModal.classList.add("opacity-100", "scale-100");
    // Disable Scroll Body
    document.body.style.overflow = "hidden";
    // Auto Focus Input setelah transisi (sedikit delay)
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  } else {
    // Tutup Modal
    searchModal.classList.add("invisible", "opacity-0", "scale-95");
    searchModal.classList.remove("opacity-100", "scale-100");
    // Enable Scroll Body
    document.body.style.overflow = "";
  }
}

// Tutup dengan tombol ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !searchModal.classList.contains("invisible")) {
    toggleSearch();
  }
});

// Shortcut Tombol Ctrl + K atau Cmd + K untuk membuka search
document.addEventListener("keydown", function (event) {
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault();
    toggleSearch();
  }
});

/* --- NEWSLETTER SIMULATION & VALIDATION --- */
document.addEventListener("DOMContentLoaded", function () {
  const newsForm = document.getElementById("newsletter-form");
  const newsInput = document.getElementById("newsletter-email");
  const newsMsg = document.getElementById("newsletter-msg");
  const newsError = document.getElementById("email-error");

  if (newsForm) {
    newsForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah Reload Halaman

      const emailValue = newsInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex validasi email sederhana

      // 1. Validasi
      if (emailValue === "" || !emailPattern.test(emailValue)) {
        // STATE: INVALID
        newsInput.classList.add(
          "border-red-500",
          "bg-red-50",
          "dark:bg-red-900/20",
        );
        newsInput.classList.remove(
          "border-transparent",
          "bg-slate-100",
          "dark:bg-slate-800",
        );

        newsError.classList.remove("hidden");
        newsMsg.classList.add("hidden");

        // Animasi getar (shake) sederhana
        newsInput.parentElement.classList.add("animate-shake");
        setTimeout(
          () => newsInput.parentElement.classList.remove("animate-shake"),
          500,
        );
      } else {
        // STATE: VALID / SUCCESS
        // Menghapus state error
        newsInput.classList.remove(
          "border-red-500",
          "bg-red-50",
          "dark:bg-red-900/20",
        );
        newsInput.classList.add(
          "border-green-500",
          "bg-green-50",
          "dark:bg-green-900/20",
        );
        newsError.classList.add("hidden");

        // Menampilkan Pesan Sukses
        newsMsg.innerText = "✓ Terimakasih! Email Anda berhasil terdaftar.";
        newsMsg.className =
          "text-[10px] font-bold mb-2 block text-green-600 dark:text-green-400 animate-fade-in";
        newsMsg.classList.remove("hidden");

        // Simulasi Loading & Reset Form
        const btn = newsForm.querySelector("button");
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin text-xs"></i>';
        btn.disabled = true;

        setTimeout(() => {
          newsInput.value = ""; // Reset field
          newsInput.className =
            "bg-slate-100 dark:bg-slate-800 border-2 border-transparent rounded-l-lg px-3 py-2 text-xs w-full focus:ring-0 focus:outline-none text-slate-900 dark:text-white transition-all duration-300";
          btn.innerHTML = originalIcon;
          btn.disabled = false;

          // Hilangkan notifikasi sukses setelah 5 detik
          setTimeout(() => {
            newsMsg.classList.add("opacity-0");
            setTimeout(() => {
              newsMsg.classList.add("hidden");
              newsMsg.classList.remove("opacity-0");
            }, 300);
          }, 5000);
        }, 1500);
      }
    });

    // Hapus tanda merah saat user mulai mengetik lagi
    newsInput.addEventListener("input", function () {
      if (this.classList.contains("border-red-500")) {
        this.classList.remove(
          "border-red-500",
          "bg-red-50",
          "dark:bg-red-900/20",
        );
        this.classList.add(
          "border-transparent",
          "bg-slate-100",
          "dark:bg-slate-800",
        );
        newsError.classList.add("hidden");
      }
    });
  }
});

// --- SCRIPT ANIMASI CUSTOM (PENGGANTI AOS) ---
document.addEventListener("DOMContentLoaded", function () {
  // 1. Pilih semua elemen yang punya class animasi
  const animatedElements = document.querySelectorAll(
    ".fade-up, .fade-down, .fade-left, .fade-right, .zoom-in, .zoom-out",
  );

  // 2. Setting Observer (Kapan animasi mulai?)
  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // Animasi jalan saat 10% elemen muncul
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // A. Memicu Animasi
        target.classList.add("aos-animate");

        // B. Cleanup (PENTING!)
        // Hapus transform setelah animasi selesai (1.2 detik)
        // Supaya elemen fixed (seperti modal) di dalamnya kembali normal
        setTimeout(() => {
          target.classList.add("aos-done");
        }, 1200);

        // C. Stop observing (Animasi cuma sekali seumur hidup page load)
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  // 3. Mulai memantau semua elemen
  animatedElements.forEach((el) => observer.observe(el));
});
