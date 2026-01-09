document.addEventListener("DOMContentLoaded", () => {
  // 1. Ambil URL browser saat ini tanpa query string (?id=...)
  const currentUrl = window.location.href.split(/[?#]/)[0];

  // Ambil nama file saja untuk backup logic (misal: profil_tk.html)
  const currentFilename = window.location.pathname.split("/").pop();

  const activeClasses = [
    "bg-primary-50",
    "text-primary-700",
    "font-bold",
    "shadow-sm",
    "active",
  ];

  const inactiveClasses = [
    "text-slate-600",
    "dark:text-slate-300",
    "hover:text-primary-600",
    "hover:bg-white/80",
    "hover:bg-slate-50",
    "dark:hover:bg-slate-700",
    "dark:hover:bg-slate-800",
    "font-semibold",
    "font-medium",
  ];

  function initActiveMenu({
    selector,
    indexPages = [],
    usePill = false,
    useDropdown = false,
    parentUsePill = false,
  }) {
    document.querySelectorAll(selector).forEach((link) => {
      // 2. Ambil URL PENUH dari link (bukan "../tk/...", tapi "http://127.0.0.1/tk/...")
      // link.href otomatis dikonversi browser menjadi alamat lengkap
      const linkUrl = link.href.split(/[?#]/)[0];

      // Ambil nama file target dari link untuk pengecekan index
      const linkFilename = linkUrl.split("/").pop();

      // 3. LOGIKA BARU:
      // - Cek apakah URL Link SAMA PERSIS dengan URL Browser
      // - ATAU jika kita sedang di salah satu halaman index (tk_index/index)
      const isIndexPage =
        indexPages.includes(currentFilename) || currentFilename === "";
      const isLinkToIndex = indexPages.includes(linkFilename);

      const isActive = linkUrl === currentUrl || (isIndexPage && isLinkToIndex);

      // --- Debugging (Lihat Console Browser jika masih error) ---
      // console.log(`Cek Link: ${linkFilename} | Current: ${currentFilename} | Active: ${isActive}`);

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
  // SD
  initActiveMenu({
    selector: ".desktop-link-sd, .mobile-nav-link-sd",
    // Masukkan semua variasi nama file halaman depan
    indexPages: ["sd_index.html", "index.html", ""],
    usePill: true,
  });
  initActiveMenu({
    selector: ".dropdown-link-sd",
    indexPages: ["sd_index.html", "index.html", ""],
    usePill: false,
    useDropdown: true,
    parentUsePill: true,
  });
});
