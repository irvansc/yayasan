/* --- FILE: assets/js/tk_script.js --- */

document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. SETUP VARIABLES ---
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index_tk.html";
    
    // Element Navigasi
    const navLinks = document.querySelectorAll('.desktop-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section');
    
    // Class Definitions (Pill Style Button)
    const activeClasses = ['bg-primary-50', 'text-primary-700', 'font-bold', 'shadow-sm', 'active'];
    const inactiveClasses = ['text-slate-600', 'dark:text-slate-300', 'hover:text-primary-600', 'hover:bg-white/80', 'dark:hover:bg-slate-700', 'font-semibold'];

    // --- 2. ACTIVE STATE LOGIC (PAGE LOAD) ---
    function setActivePage() {
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            let isActive = false;

            // Logic Match
            if (linkHref === currentPage) {
                isActive = true;
            } else if ((currentPage === 'index_tk.html' || currentPage === '') && (linkHref === './' || linkHref === '/' || linkHref === 'index_tk.html')) {
                // Default active di home, kecuali nanti di-override scroll spy
                isActive = true;
            }

            // Apply Style
            if (isActive) {
                if (link.classList.contains('desktop-link')) {
                    link.classList.add(...activeClasses);
                    link.classList.remove(...inactiveClasses);
                } else {
                    link.classList.add('active'); // Untuk mobile
                }
            }
        });
    }

    // --- 3. SCROLL SPY (Highlight Menu saat Scroll) ---
    function scrollSpy() {
        // Hanya jalan di halaman index_tk
        if (currentPage !== 'index_tk.html' && currentPage !== '') return;

        let currentSectionId = "";

        // Deteksi posisi scroll
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                currentSectionId = section.getAttribute("id");
            }
        });

        // Update Link Classes
        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            
            // Khusus Anchor Link (#profil, #program, dll)
            if (href.includes("#")) {
                // Reset dulu ke inactive
                if (link.classList.contains('desktop-link')) {
                    link.classList.remove(...activeClasses);
                    link.classList.add(...inactiveClasses);
                } else {
                    link.classList.remove('active');
                }

                // Jika section match, set active
                if (currentSectionId && href.includes(currentSectionId)) {
                    if (link.classList.contains('desktop-link')) {
                        link.classList.add(...activeClasses);
                        link.classList.remove(...inactiveClasses);
                    } else {
                        link.classList.add('active');
                    }
                }
            }
            
            // Khusus Link "Beranda" (index_tk.html) saat di paling atas
            if (window.scrollY < 100 && (href === 'index_tk.html' || href === './')) {
                 if (link.classList.contains('desktop-link')) {
                    link.classList.add(...activeClasses);
                    link.classList.remove(...inactiveClasses);
                }
            } else if (window.scrollY > 100 && (href === 'index_tk.html' || href === './')) {
                // Matikan highlight Beranda saat sudah scroll ke bawah
                 if (link.classList.contains('desktop-link')) {
                    link.classList.remove(...activeClasses);
                    link.classList.add(...inactiveClasses);
                }
            }
        });
    }

    // --- 4. MOBILE SIDEBAR TOGGLE ---
    // Pastikan function ini bisa dipanggil global (window) untuk onclick HTML
    window.toggleSidebar = function() {
        const sidebar = document.getElementById('mobile-sidebar');
        const backdrop = document.getElementById('mobile-backdrop');
        
        if (sidebar && backdrop) {
            if (sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.remove('-translate-x-full');
                backdrop.classList.remove('opacity-0', 'invisible');
            } else {
                sidebar.classList.add('-translate-x-full');
                backdrop.classList.add('opacity-0', 'invisible');
            }
        }
    };

    // --- 5. INITIALIZE ---
    setActivePage();
    window.addEventListener("scroll", scrollSpy);
});