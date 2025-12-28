/**
 * CORE SCRIPT (GLOBAL)
 * Digunakan di seluruh halaman website.
 */

/* --- 1. DARK MODE LOGIC --- */
const themeToggleDarkIcon = document.querySelectorAll('.fa-moon');
const themeToggleLightIcon = document.querySelectorAll('.fa-sun');
const themeToggleBtns = [document.getElementById('theme-toggle-desktop'), document.getElementById('theme-toggle-mobile')];

function toggleTheme() {
    themeToggleDarkIcon.forEach(el => el.classList.toggle('hidden'));
    themeToggleLightIcon.forEach(el => el.classList.toggle('hidden'));

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

themeToggleBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', toggleTheme);
});

// Sync icons on load
if (document.documentElement.classList.contains('dark')) {
    themeToggleDarkIcon.forEach(el => el.classList.add('hidden'));
    themeToggleLightIcon.forEach(el => el.classList.remove('hidden'));
} else {
    themeToggleDarkIcon.forEach(el => el.classList.remove('hidden'));
    themeToggleLightIcon.forEach(el => el.classList.add('hidden'));
}

/* --- 2. SIDEBAR NAVIGATION (MOBILE) --- */
const btn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('mobile-sidebar');
const backdrop = document.getElementById('mobile-backdrop');

function toggleSidebar() {
    if (!sidebar || !backdrop) return; // Guard clause
    const isClosed = sidebar.classList.contains('-translate-x-full');
    if (isClosed) {
        sidebar.classList.remove('-translate-x-full');
        backdrop.classList.remove('opacity-0', 'invisible');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.add('-translate-x-full');
        backdrop.classList.add('opacity-0', 'invisible');
        document.body.style.overflow = '';
    }
}

if (btn) btn.addEventListener('click', toggleSidebar);

// Accordion Logic (Submenu)
function toggleSub(menuId, arrowId) {
    const menu = document.getElementById(menuId);
    const arrow = document.getElementById(arrowId);
    if (!menu || !arrow) return;

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('block');
        arrow.classList.add('rotate-90');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('block');
        arrow.classList.remove('rotate-90');
    }
}

/* --- 3. NAVBAR SCROLL EFFECT --- */
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md', 'bg-white/95', 'dark:bg-dark-bg/95', 'py-0');
            navbar.classList.remove('glass-effect');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/95', 'dark:bg-dark-bg/95', 'py-0');
            navbar.classList.add('glass-effect');
        }
    });
}

/* --- 4. ACTIVE MENU LOGIC --- */
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index.html";
    const allLinks = document.querySelectorAll('.desktop-link, .mobile-nav-link, .dropdown-link');

    allLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        let isActive = false;

        if (linkHref === currentPage) {
            isActive = true;
        } else if ((currentPage === 'index.html' || currentPage === '') && (linkHref === './' || linkHref === '/')) {
            isActive = true;
        } 


        if (isActive) {
            link.classList.add('active');
            const parentGroup = link.closest('.group');
            if (parentGroup) {
                const parentBtn = parentGroup.querySelector('button');
                if (parentBtn) {
                    parentBtn.classList.add('text-primary-600', 'font-bold');
                    parentBtn.classList.remove('text-slate-700', 'dark:text-slate-200');
                }
            }
        }
    });
});

/* --- ACTIVE MENU LOGIC (UPDATED) --- */
document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil nama file saat ini
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index_tk.html";

    // 2. Definisi Class untuk state Aktif vs Inaktif (Sesuai desain Pill Button)
    const activeClasses = ['bg-primary-50', 'text-primary-700', 'font-bold', 'shadow-sm', 'active'];
    const inactiveClasses = ['text-slate-600', 'dark:text-slate-300', 'hover:text-primary-600', 'hover:bg-white/80', 'dark:hover:bg-slate-700', 'font-semibold'];

    const allLinks = document.querySelectorAll('.desktop-link-tk, .mobile-nav-link-tk');

    allLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        let isActive = false;

        // 3. Logika Pencocokan
        if (linkHref === currentPage) {
            isActive = true;
        } else if ((currentPage === 'index_tk.html' || currentPage === '') && (linkHref === './' || linkHref === '/' || linkHref === 'index_tk.html')) {
            isActive = true;
        }

        // 4. Terapkan Style
        if (isActive) {
            // Jika link adalah tipe Desktop (Pill Shape)
            if (link.classList.contains('desktop-link-tk')) {
                link.classList.add(...activeClasses);     // Tambah style hijau
                link.classList.remove(...inactiveClasses); // Hapus style abu-abu
            } 
            // Jika link Mobile
            else if (link.classList.contains('mobile-nav-link-tk')) {
                link.classList.add('active'); // Style active mobile sudah ada di CSS
            }
        } else {
            // Pastikan link inaktif memiliki style default
            if (link.classList.contains('desktop-link-tk')) {
                link.classList.remove(...activeClasses);
                link.classList.add(...inactiveClasses);
            }
             else if (link.classList.contains('mobile-nav-link-tk')) {
                link.classList.remove('active');
            }
        }
    });
});